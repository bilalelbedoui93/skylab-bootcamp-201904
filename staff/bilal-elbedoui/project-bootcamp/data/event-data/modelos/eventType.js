const mongoose = require('mongoose')
const Joi= require('@hapi/joi')


const eventTypeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true
    }
})


function validateEventType(type){

    const Schema={
        name: Joi.string().min(5).required()
    }
    return Joi.validate(type, Schema)
}

exports.eventTypeSchema = eventTypeSchema;
exports.EventType = mongoose.model('EventType', eventTypeSchema)
exports.validate = validateEventType