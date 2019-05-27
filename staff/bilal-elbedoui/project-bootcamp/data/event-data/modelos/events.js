const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { fieldsSchema } = require('./medical-fields')
const { eventTypeSchema } = require('./eventType')

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    description:{
        type:String,
        required:true,
        minlength:100,
    },
    eventPlaner: {
        type: new mongoose.Schema({
            organizationName: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 255,
                trim: true,
            },
            organizationPhone: {
                type: String,
                required: true,
                minlength: 9,
                maxlength: 20,
                trim: true
            },
            organizationMail: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 255,
                trim: true
            }
        })
    },
    field: {
        type: fieldsSchema,
        required: true
    },
    type: {
        type: eventTypeSchema,
        required: true
    },
    location: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    numberTicketsAvailable: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    }
})


exports.Event=mongoose.model('Event', eventSchema)