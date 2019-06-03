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



describe('logic', () => {

    before(() => mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true }))

    describe('Organization', () => {

        let organizationName, organizationPhone, organizationMail, organizationAddress, password


        beforeEach(async () => {

            await Organization.deleteMany()

            organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`,
                organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`,
                organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`,
                organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`,
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
        })
        describe('Authenticate organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('it Should succed if the credentials are correct', async () => {
                const orga = await logic.authenticateOrganization({ organizationMail, password })

                expect(orga.id).to.exist
                expect(orga).to.be.an('object')
                expect(orga).to.not.be.undefined
            })
        })
        describe('Retrieve Organization', ()=>{
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('Should retrieve a correct user', async()=>{
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
        describe()



        })

    })
})