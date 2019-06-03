const mongoose = require('mongoose');
const express = require('express');
const { Field, validateField } = require('../data/event-data/modelos/medical-fields');
const { EventType, validateEventType } = require('../data/event-data/modelos/eventType');
const { Organization, validateRegisterOrganization, validateAuthOrganization } = require('../data/event-data/modelos/organization');
const { User, validateRegisterUser, validateAuthUser } = require('../data/event-data/modelos/users');
const { Event, validateEvent } = require('../data/event-data/modelos/events')
const { QueAns } = require('../data/event-data/modelos/questionsAnswers')
const { Purchase, validatePurchase } = require('../data/event-data/modelos/purchase')
const cities = require("all-the-cities-mongodb")
const { LogicError, ValidateError } = require('../common/errors')
const Fawn = require('fawn')
const bcrypt = require('bcrypt');

Fawn.init(mongoose)

const logic = {
    /***********************************MEDICAL-FIELDS FUNCTIONS*********************************************/
    async createMedicalField(field) {

        const { error } = validateField(field)
        if (error) throw new ValidateError(error.details[0].message);
        const { field } = name
        try {
            const field = new Field({
                name
            })
            return await field.save();
        } catch (err) {
            for (field in err.errors)
                throw new ValidateError(err.errors[field].message);
        }
    },

    async getOnefield(id) {
        return await Field.findById(id)
    },

    async getAllfields() {
        return await Field.find().select('name').sort('name')
    },

    /***********************************EVENT-TYPES FUNCTIONS*********************************************/

    async createEventType(type) {

        const { error } = validateEventType(type);
        if (error) throw new ValidateError(error.details[0].message);
        const { name } = type
        try {
            const eventType = new EventType({
                name
            })
            return await eventType.save();
        } catch (err) {
            for (field in err.errors)
                throw new ValidateError(err.errors[field].message);
        }
    },

    async getOneEventType(id) {
        return await EventType.findById(id)
    },

    async getAllEventType() {
        return await EventType.find()
    },

    /***********************************ORGANIZATION FUNCTIONS*********************************************/


    async createOrganization(req) {
        debugger
        const { error } = validateRegisterOrganization(req);
        if (error) throw new ValidateError(error.details[0].message);

        const { organizationName, organizationPhone, organizationMail, organizationAddress, password } = req

        let user = await Organization.findOne({ organizationMail })

        if (user) throw Error(`The organization with the email ${email} already exists`)

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        try {
            user = await Organization.create({ organizationName, organizationPhone, organizationMail, organizationAddress, password: hash })

            return user
        } catch (ex) {
            for (field in ex.errors)
                throw new ValidateError(ex.errors[field].message);
        }

    },

    async authenticateOrganization(req) {

        const { error } = validateAuthOrganization(req)
        if (error) throw new ValidateError(error.details[0].message);

        const { organizationMail, password } = req

        let orga = await Organization.findOne({ organizationMail })
        if (!orga) throw new LogicError(`Organization with the email ${email} doesn't exist`)

        const validPassword = await bcrypt.compare(password, orga.password)
        if (!validPassword) throw new LogicError('Wrong credential')

        return orga;

    },

    async retrieveOrganization(id) {
        debugger
        const orga = await Organization.findById(id).select('-password');
        if (!orga) throw new LogicError('Organisation does not exist');

        return orga;

    },

    /***********************************USER FUNCTIONS*********************************************/


    async createUser(req) {
        const { error } = validateRegisterUser(req);
        if (error) throw new ValidateError(error.details[0].message);
        debugger
        const { fullname, email, role, organization, phoneNumber, situation, password } = req

        let user = await User.findOne({ email })
        if (user) throw Error(`The user with the email ${email} already exists`)
        debugger
        if (role === 'admin') {
            let orga = await this.retrieveOrganization(organization)
            if (!orga) throw Error('Organitzation not found')
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            try {
                user = await User.create({ fullname, email, role, organization: orga, phoneNumber, situation, password: hash })
                orga.representants.push(user.id)
                await orga.save()
                return user
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else if (role === 'normal' && !organization) {
            debugger
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            try {
                user = await User.create({ fullname, email, role, phoneNumber, situation, password: hash })
                return user
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else {
            throw Error('You should not have a Organization ID')
        }
    },

    async authenticateUser(user) {


        const { error } = validateAuthUser(user)
        if (error) throw new ValidateError(error.details[0].message);

        const { email, password } = user


        let user1 = await User.findOne({ email })
        if (!user1) throw new LogicError(`User with the email ${email} doesn't exist`)

        const validPassword = await bcrypt.compare(password, user1.password)
        if (!validPassword) throw new LogicError('Wrong credentials!')

        return user1;
    },
    async retrieveUser(id) {

        let user = await User.findById(id).select('-password');
        if (!user) throw Error('User does not exist')

        return user

    },

    /**************************************EVENTS FUNCTIONS************************************************/

    async createEvent({ _id, organization }, event) {

        representant = _id;
        const { error } = validateEvent({ representant, organization }, event)
        if (error) throw new ValidateError(error.details[0].message)

        let { title, description, field, eventType, location, date, numberTicketsAvailable, price } = event

        // const { country, city } = location

        // const resultCity = cities.filter(cit => {
        //     return cit.name.match(city) && cit.country.match(country)
        // })
        // const resultcountry = cities.filter(coun => {
        //     return coun.country.match(country)
        // })
        // if(!city) throw new LogicError('Introduce please a correct city & country name')


        let user = await this.retrieveUser(representant)
        let medicalField = await this.getOnefield(field)
        let type = await this.getOneEventType(eventType)
        if (!organization) throw Error('You are not allowed to create events')
        let orga = await this.retrieveOrganization(organization)

        if (orga.representants.indexOf(representant) >= 0) {
            try {
                event = await new Event({
                    title,
                    description,
                    representant: user,
                    field: medicalField,
                    eventType: type,
                    location,
                    date,
                    numberTicketsAvailable,
                    price
                })
                await event.save()
                orga.events.push(event.id)
                await orga.save()
                return event
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else {
            throw Error('You do not belong anymore to this organization')
        }


    },

    async retrieveEvents(query) {

        const { field, eventType } = query
cd 
        if (field && eventType) {
            const events = await Event.find().and([{ 'field.name': field }, { 'eventType.name': eventType }])
            if (!events) throw Error('There are no events available')
            return events;
        }
        else if (field) {
            const event = await Event.find({ 'field.name': field })
            if (!events) throw Error('There are no events available')
            return event;
        }
    },

    async retrieveOneEvent(id) {

        const event = await Event.findById(id)
        if (!event) throw Error('This events does not exist anymore')
        return event;

    },

    async updateDescriptionEvent(eventid, userId, body) {

        // const {error} = validateEvent(body.description)
        // const { error } = validateEvent({ representant, organization }, event)

        debugger
        const { _id, organization } = userId;
        let role;
        if (!organization) throw Error('You are now allowed to modify this event')

        // const orga = await this.retrieveOrganization(organization._id)
        let event = await this.retrieveOneEvent(eventid)
        debugger
        if (event.representant.id === _id /*&& orga.representants.indexOf(_id) >= 0*/) {
            debugger

            event.description = body.description;

            // event.set({
            //    description: body,
            // })

            const result = await event.save();
            debugger
            return result
        } else {
            throw Error('Just who created the event is allowed to carry out modifications')
        }
    },

    async addNewPost(eventid, userId, body) {
        debugger
        const { _id, organization } = userId;
        let role;
        const orga = await this.retrieveOrganization(organization._id)
        orga.events.indexOf(eventid) >= 0 && orga.representants.indexOf(_id) >= 0 ? role = 'Representant of the event' : role = 'normal'

        let post = await new QueAns({
            event: eventid,
            author: _id,
            roleAuthor: role,
            text: body.text
        })

        await post.save()

        return post;
    },



    async retrievePosts(eventId) {

        const posts = await QueAns.find({ 'event': eventId })
        debugger
        return posts

    },

    /******************************PURCHASE FUNCTIONS***************************/

    async makePurchase(eventId, customer, body) {
        debugger
        const { _id: customerId, organization } = customer
        const { error } = validatePurchase({ eventId, customerId })
        if (error) throw new ValidateError(error.details[0].message)

        const { numberOfticketsBoughts } = body

        const event = await this.retrieveOneEvent(eventId)

        if (event.numberTicketsAvailable === 0) return 'SOLD OUT'
        debugger
        let purchase = new Purchase({

            customer: customerId,
            event: eventId,
            numberOfticketsBoughts

        })
        try {
            // const result = await purchase.save()

            // const result1= await Event.findByIdAndUpdate(eventId, {
            //     $set: {
            //         numberTicketsAvailable: (numberTicketsAvailable - numberOfticketsBoughts)

            //     }
            // })


            debugger
            new Fawn.Task()
                .save('purchases', purchase)
                .update('events', { event: eventId }, {
                    $inc: {
                        numberTicketsAvailable: -33
                    }
                })
                .run({ useMongoose: true })
            debugger
            return result;
        } catch (ex) {
            debugger
            throw Error('Something failed')
        }

        //TODO RETRIEVE PURCHASES
    }
}

module.exports = logic
