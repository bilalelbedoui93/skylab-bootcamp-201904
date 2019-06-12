const { LogicError, ValidateError } = require('../common/errors');
const bcrypt = require('bcrypt');
const { validateUser, validateCredentials, validateOrganization, validateEvent, validateEventType, validateField, validatePurchase } = require('../common/validate')

const { mongoose, models: { User, Event, EventType, Comment, Purchase, Organization, MedicalField } } = require('medyes-data')

const logic = {
    /***********************************MEDICAL-FIELDS FUNCTIONS*********************************************/
    createMedicalField(userId, name) {

        const { error } = validateField({ name })
        if (error) throw new ValidateError(error.details[0].message);
        debugger
        return (async () => {

            const user = await User.findById(userId)
            if (user.role !== 'superAdmin') throw new LogicError('You are not allowed to create medical fields')

            try {
                const medicalField = new MedicalField({
                    name
                })
                return await medicalField.save();
            } catch (err) {
                for (field in err.errors)
                    throw new ValidateError(err.errors[field].message);
            }

        })()
    },

    getOnefield(id) {
        return (async () => {
            return await MedicalField.findById(id)
        })()
    },

    getAllfields() {
        return (async () => {
            return await MedicalField.find().select('name').sort('name')
        })()
    },

    /***********************************EVENT-TYPES FUNCTIONS*********************************************/

    createEventType(userId, name) {

        const { error } = validateEventType({ name });
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {
            const user = await User.findById(userId)
            if (user.role !== 'superAdmin') throw new LogicError('You are not allowed to create event types')
            try {
                const eventType = new EventType({
                    name
                })
                return await eventType.save();
            } catch (err) {
                for (field in err.errors)
                    throw new ValidateError(err.errors[field].message);
            }
        })()
    },

    getOneEventType(id) {
        return (async () => {
            return await EventType.findById(id)
        })()
    },

    getAllEventTypes() {
        return (async () => {
            return await EventType.find()
        })()
    },

    /***********************************ORGANIZATION FUNCTIONS*********************************************/


    createOrganization(userId, name, phone, address, mail) {
        
        const { error } = validateOrganization({ name, phone, address, mail });
        if (error) throw new ValidateError(error.details[0].message);
        
        return (async () => {
            
            const user = await User.findById(userId)
            if (user.role !== 'superAdmin') throw new LogicError('You are not allowed to create organizations')
            
            let org = await Organization.findOne({ mail })
            if (org) throw Error(`The organization with the email ${mail} already exists`)

            try {
                org = await new Organization({ name, phone, address, mail })
                await org.save()
                return org
            } catch (ex) {
                for (field in ex.errors)
                    throw new ValidateError(ex.errors[field].message);
            }
        })()
    },

    retrieveOrganization(id) {
        return (async () => {
            const orga = await Organization.findById(id).select('-password');
            if (!orga) throw new LogicError('Organization does not exist');

            return orga;
        })()
    },

    /***********************************USER FUNCTIONS*********************************************/

    createUser(fullname, email, role, organization, phone, position, password) {
        const { error } = validateUser({ fullname, email, role, organization, phone, position, password })
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {

            let user = await User.findOne({ email })
            if (user) throw Error(`The user with the email ${email} already exists`)

            if (role === 'admin') {
                let orga = await Organization.findById(organization)
                if (!orga) throw Error('Organization not found')
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt)
                try {
                    user = await new User({ fullname, email, role, organization: orga.id, phone, position, password: hash })
                    await user.save()
                    orga.representants.push(user.id)
                    await orga.save()
                    return user
                } catch (ex) {
                    for (field in ex.errors) {
                        throw new ValidateError(ex.errors[field].message);
                    }
                }
            } else if (role === 'normal' && !organization) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt)
                try {
                    user = await new User({ fullname, email, role, phone, position, password: hash })
                    await user.save()
                    return user
                } catch (ex) {
                    for (field in ex.errors) {
                        throw new ValidateError(ex.errors[field].message);
                    }
                }
            } else {
                throw Error('You should not have a Organization ID')
            }
        })()
    },

    authenticateUser(email, password) {

        const { error } = validateCredentials({ email, password })
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {

            let user = await User.findOne({ email })
            if (!user) throw new LogicError(`User with the email ${email} doesn't exist`)

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) throw new LogicError('Wrong credentials!')

            let info
            if (user.role === 'admin') {
                info = { userId: user.id, orgId: user.organization } // TODO use role instead of organization

            } else {
                info = { userId: user.id }

            }
            return info
        })()

    },
    retrieveUser(id) {

        return (async () => {
            let user = await User.findById(id).select('-password').lean(); // TODO do not return a mongoose-connected object, but a plain object (use .lean())
            if (!user) throw new LogicError('User does not exist') // TODO use LogicError instead

            // TODO clean user, return _id value in id property and remove _id property
            user.id = user._id.toString()
            delete user._id
            delete user.__v

            return user
        })()
    },

    /**************************************EVENTS FUNCTIONS************************************************/

    createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price, image) {
        if (!orgId) throw Error('You are not allowed to create events')

        const { error } = validateEvent({ userId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price })
        if (error) throw new ValidateError(error.details[0].message)

        return (async () => {

            let user = await User.findById(userId).select('-password')
            let field = await MedicalField.findById(medicalField)
            let type = await EventType.findById(eventType)
            let orga = await Organization.findById(orgId)

            if (orga.representants.indexOf(userId) >= 0) {
                try {

                    event = await new Event({
                        title,
                        description,
                        representant: user,
                        medicalField,
                        eventType: type,
                        location,
                        date,
                        numberTicketsAvailable,
                        price,
                        image
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
                throw Error('You do not belong anymore to this organization') // TODO use LogicError
            }
        })()
    },

    retrieveEvents(medicalField, eventType) {
        debugger
        return (async () => {
            debugger
            if (medicalField=='undefined' && eventType=='undefined') {
                const events = await Event.find().populate('medicalField').populate('representant').populate('medicalField').populate('eventType').lean()
                if (!events) throw Error('There are no events available')
                return events
            }

            debugger
            if (medicalField && eventType!=='undefined') {
                const events = await Event.find().populate('medicalField eventType').populate('representant').populate('medicalField').populate('eventType').lean()
                const result = events.filter(event => {
                    return event.medicalField.name === medicalField && event.eventType.name === eventType
                });
                if (!result) throw Error('There are no events available')
                return result;
            }
            else if (medicalField) {
                debugger
                const events = await Event.find().populate('medicalField').populate('representant').populate('medicalField').populate('eventType').lean()
                const result = events.filter(event => {
                    return event.medicalField.name === medicalField
                });
                if (!result) throw Error('There are no events available')
                return result;
            } else if (!medicalField && !eventType) {
                const events = await Event.find()
                if (!events) throw Error('There are no events available')
                return events
            }
        })()
    },

    retrieveOneEvent(id) {
        return (async () => {
            const event = await Event.findById(id).populate('representant').populate('medicalField').populate('eventType').lean();
            if (!event) throw Error('This events does not exist anymore')
            for (let key in event) {
                if (key.startsWith('__')) delete event[key] 
            }
            return event;
        })()
    },

    updateDescriptionEvent(eventId, userId, description) {
        debugger

        return (async () => {
            debugger
            let event = await Event.findById(eventId)

            if (event.representant.toString() === userId) {
                debugger
                event.description = description;

                const result = await event.save();

                return result
            } else {
                throw Error('Just who created the event is allowed to carry out modifications')
            }
        })()

    },

    addNewPost(eventid, sub, org, text) {
        debugger
        return (async () => {

            let role, orga;

            if (!org) {
                role = 'normal'
            } else {
                orga = await Organization.findById(org)
                debugger
                orga.events.indexOf(eventid) >= 0 && orga.representants.indexOf(sub) >= 0 ? role = 'Representant of the event' : role = 'normal'
            }
            debugger
            const event= await Event.findById(eventid)
            let post = await new Comment({
                event: eventid,
                author: sub,
                roleAuthor: role,
                text
            })

            await post.save()
            event.comments.push(post)
            await event.save()
            debugger
            return post;
        })()
    },

    retrievePosts(eventId) { // TODO comments are embed! not linked, check model schema!
        return (async () => {
            const posts = await Comment.find({ 'event': eventId })
            return posts
        })()
    },

    /******************************PURCHASE FUNCTIONS***************************/

    makePurchase(eventId, customerId, numberOfTickets) {

        const { error } = validatePurchase({ eventId, customerId })

        if (error) throw new ValidateError(error.details[0].message)

        return (async () => {

            const event = await Event.findById(eventId)

            if (event.numberTicketsAvailable === 0) return 'SOLD OUT' // TODO avoid returning messages on unexpected situtation. throw logic error instead.

            const purchase = new Purchase({
                customer: customerId,
                event: eventId,
                numberOfTickets

            })
            try {
                const result = await purchase.save()

                const result1 = await Event.findById(eventId)

                result1.numberTicketsAvailable = result1.numberTicketsAvailable - numberOfTickets

                await result1.save()

                return result;
            } catch (ex) {

                throw Error('Something failed') // TODO LogicError instead, and send the ex.message
            }
        })()
    },

    retrievePurchases(userId, orgId) { // TODO is orgId required?
        return (async () => {
            const purchases = await Purchase.find()
            return purchases

        })()

    }
}

module.exports = logic