const mongoose = require('mongoose');
const express = require('express');
const { Field, validateField } = require('../data/event-data/modelos/medical-fields');
const { EventType, validateEventType } = require('../data/event-data/modelos/eventType');
const { Organization, validateRegisterOrganization, validateAuthOrganization } = require('../data/event-data/modelos/organization');
const { User, validateRegisterUser, validateAuthUser } = require('../data/event-data/modelos/users');
const { Event, validateEvent } = require('../data/event-data/modelos/events')
const { QueAns } = require('../data/event-data/modelos/questionsAnswers')
const { Purchase, validatePurchase } = require('../data/event-data/modelos/purchase')
const logic = require('.')
const { expect } = require('chai')
const bcrypt = require('bcrypt');



describe('LOGIC', () => {

    before(() => mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true }))

    describe('ORGANIZATION', () => {

        let organizationName, organizationPhone, organizationMail, organizationAddress, password

        beforeEach(async () => {


            await Organization.deleteMany()

            organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
            organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

        })

        describe('Register organization', () => {
            it('Should succed registering a new organization', async () => {


                const res = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

                expect(res).to.not.be.undefined

                const orga = await Organization.find()

                expect(orga).to.exist
                expect(orga).to.have.lengthOf(1)

                const [organization] = orga
                expect(organization.organizationName).to.equal(organizationName)
                expect(organization.organizationPhone).to.equal(organizationPhone)
                expect(organization.organizationMail).to.equal(organizationMail)
                expect(organization.organizationAddress).to.equal(organizationAddress)
                expect(organization.password).to.exist
                expect(await bcrypt.compare(password, organization.password)).to.be.true
            })
            it('Should fail if the password does not respect the password complexity', async () => {
                try {
                    password = 1235
                    const res = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('"password" must meet password complexity requirements')
                }
            })
            it('Should fail if the email already exists', async () => {
                await Organization.deleteMany()

                await logic.createOrganization({ organizationName: 'entreprise-prueba', organizationPhone: '123456789', organizationMail: 'email@gmaiiil.com', organizationAddress: 'Calle de la marina', password: 'BBbb11..' })
                try {
                    await logic.createOrganization({ organizationName, organizationPhone, organizationMail: 'email@gmaiiil.com', organizationAddress, password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal(`The organization with the email email@gmaiiil.com already exists`)
                }
            })
            it('Should fail if the organization name has less than 10 characters', async () => {
                try {
                    debugger
                    const res = await logic.createOrganization({ organizationName: 'bilalot', organizationPhone, organizationMail, organizationAddress, password })
                } catch (error) {
                    debugger
                    expect(error.message).to.exist
                    expect(error.message).to.equal("Path `organizationName` (`bilalot`) is shorter than the minimum allowed length (10).")
                }

            })
        })
        describe('Authenticate organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('Should succed if the credentials are correct', async () => {
                const orga = await logic.authenticateOrganization({ organizationMail, password })

                expect(orga.id).to.exist
                expect(orga).to.be.an('object')
                expect(orga).to.not.be.undefined
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    orga = await logic.authenticateOrganization({ organizationMail: 'holholala', password })
                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error.message).to.equal('"organizationMail" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    orga = await logic.authenticateOrganization({ organizationMail: 'holhola@gmail.com', password })
                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error.message).to.equal(`Organization with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    const orga = await logic.authenticateOrganization({ organizationMail, password: 'HHhh11..' })

                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credential')
                }
            })
        })
        describe('Retrieve Organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('Should retrieve a correct user', async () => {
                debugger
                const result = await logic.retrieveOrganization(orga._id)

                debugger
                expect(result).to.exist
                expect(result).to.be.an('object')
                debugger

                expect(result.id).to.not.be.undefined

                // const [organization] = result

                expect(result.organizationName).to.equal(organizationName)
                expect(result.organizationPhone).to.equal(organizationPhone)
                expect(result.organizationMail).to.equal(organizationMail)
                expect(result.organizationAddress).to.equal(organizationAddress)
                expect(result.password).to.not.exist
            })
            it('should fail if the Organization does not exist', async()=>{
                try{
                    const result = await logic.retrieveOrganization('5cf3a7d829aec72e183cb119')
                }catch(error){
                
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Organisation does not exist')
                }
            })
        })
    })
    describe('MEDICAL-FIELDS', () => {

        let name

        beforeEach(async () => {

            await Field.deleteMany()

            name = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
        })
        describe('Create a medical field', () => {
            let field
            it('Should create the entry', async () => {

                field = await logic.createMedicalField({ name })

                expect(field).to.not.be.undefined
                expect(field.name).to.equal(name)

            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createMedicalField({ name })

                } catch (error) {

                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')

                }
            })
            it('should fail if the field has more than 40 carachters', async () => {
                try {
                    debugger
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    debugger
                    field = await logic.createMedicalField({ name })

                } catch (error) {
                    debugger
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }

            })
        })
        describe('Retrieve a field', () => {
            let field
            beforeEach(async () => field = await logic.createMedicalField({ name })
            )
            it('Should retrieve a field providing the id ', async () => {

                const fieldRetrieved = await logic.getOnefield(field.id)

                expect(fieldRetrieved).to.not.be.undefined
                expect(fieldRetrieved.id).to.exist
                expect(fieldRetrieved.name).to.equal(field.name)
            })
        })
        describe('Retrieve all fields', () => {
            let fields;

            beforeEach(async () => {

                fields = new Array(10).fill().map(field => {
                    return field = {
                        name: `Cardio${Math.floor(Math.random() * (1000 - 1)) + 1}logy`
                    }
                })

                return await Promise.all(fields.map(async field => await logic.createMedicalField(field)))
            })


            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllfields()
                expect(campos).to.have.lengthOf(10)

            })

        })

    })

    describe('EVENT-TYPE', () => {

        let name

        beforeEach(async () => {

            await EventType.deleteMany()

            name = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`
        })
        describe('Create an event type', () => {

            it('Should create the entry', async () => {

                const event = await logic.createEventType({ name })

                expect(event).to.not.be.undefined
                expect(event.name).to.equal(name)

            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createEventType({ name })

                } catch (error) {

                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')

                }
            })
            it('should fail if the event type name has more than 40 carachters', async () => {
                try {
                    debugger
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    debugger
                    field = await logic.createEventType({ name })

                } catch (error) {
                    debugger
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }

            })
        })
        describe('Retrieve the event type', () => {
            let events
            beforeEach(async () => events = await logic.createEventType({ name })
            )
            it('Should retrieve the event type providing the id ', async () => {

                const eventRetrieved = await logic.getOneEventType(events.id)

                expect(eventRetrieved).to.not.be.undefined
                expect(eventRetrieved.id).to.exist
                expect(eventRetrieved.name).to.equal(events.name)
            })
        })
        describe('Retrieve all event types', () => {
            let events;

            beforeEach(async () => {

                events = new Array(7).fill().map(event => {
                    return event = {
                        name: `Cardio${Math.floor(Math.random() * (1000 - 1)) + 1}logy`
                    }
                })
                return await Promise.all(events.map(async event => await logic.createEventType(event)))
            })


            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllEventType()

                expect(campos).to.have.lengthOf(7)
            })

        })

    })
    describe('USERS', () => {

        let organizationName, organizationPhone, organizationMail, organizationAddress, password
        let orga
        let fullname, email, role, organization, phoneNumber, situation

        beforeEach(async () => {

            await Organization.deleteMany()
            await User.deleteMany()

            organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
            organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

            orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

            fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
            email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
            role = 'admin'
            organization = orga.id
            phoneNumber = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            situation = 'student'
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
        })

        describe('Create Admin user', () => {

            it('Should create a represeant of random company', async () => {

                const userAdmin = await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password })

                expect(userAdmin).to.not.be.undefined
                expect(userAdmin).to.exist
                expect(userAdmin.organization.id).to.equal(orga.id)

            })

            it('Should fail if the user role is normal', async () => {
                role = 'normal';
                let userAdmin
                try {
                    userAdmin = await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password })

                } catch (error) {

                    expect(error.message).to.equal('You should not have a Organization ID')
                    expect(userAdmin).to.be.undefined
                }


            })
        })

    })

    after(async () => mongoose.disconnect(true))
})