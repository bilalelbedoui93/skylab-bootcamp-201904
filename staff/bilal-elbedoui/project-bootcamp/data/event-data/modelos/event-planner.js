const mongoose = require('mongoose');
const Joi= require('@hapi/joi');


const eventPlannerSchema= new mongoose.Schema({

    organizationName: {
        type:String,
        required:true,
        minlength:10,
        maxlength:255,
        trim:true,
    },
    organizationPhone: {
        type:String,
        required:true,
        minlength:9,
        maxlength:20,
        trim:true
    },
    organizationMail:{
        type:String,
        required:true,
        minlength:10,
        maxlength:255,
        trim:true
    },
    organizationAddress:{
        type:String,
        required: true,
        minlength:10,
        maxlength:255,
        lowercase: true
    }
})


function validateEventPlanner(eventPlanner){
    const schema = {
        organizationName: Joi.string().min(10).required(),
        organizationPhone:Joi.string().min(9).required(),
        organizationMail:Joi.string().email().min(9).required(),
        organizationAddress: Joi.string().min(10).required()
    }

    return Joi.validate(schema, eventPlanner)
}

exports.EventPlanner= mongoose.model('EventPlanner', eventPlannerSchema);
exports.validate = validateEventPlanner;