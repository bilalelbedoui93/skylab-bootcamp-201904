const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const organizationSchema = new mongoose.Schema({

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
    organizationAddress: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        lowercase: true
    },
    organizationMail: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        trim: true
    },
    representants: {
        type: Array
    },
    events:{
        type:Array
    }
})

organizationSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));

    return token
};


function password() {
    debugger
    return complexityOptions = {
        min: 5,
        max: 255,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
        /* 
           Min & Max not considered in the count. 
           Only lower, upper, numeric and symbol. 
           requirementCount could be from 1 to 4 
           If requirementCount=0, then it takes count as 4
       */
    }
}
function validateRegisterOrganization(user) {
    debugger
    const complexityOptions = password()
    const schema = {
        organizationName: Joi.string().min(5).required(),
        organizationPhone: Joi.string().min(9).required(),
        organizationMail: Joi.string().min(9).email().required(),
        organizationAddress: Joi.string().required(),
        password: new PasswordComplexity(complexityOptions).required()

    }
    debugger
    const result = Joi.validate(user, schema)
    debugger
    return result
}

function validateAuthOrganization(user) {
    debugger
    const complexityOptions = password()
    const schema = {
        organizationMail: Joi.string().min(9).email().required(),
        password: new PasswordComplexity(complexityOptions).required()
    }

    return Joi.validate(user, schema)
}

exports.Organization = mongoose.model('Organization', organizationSchema);
exports.organizationSchema=organizationSchema;
exports.validateRegisterOrganization = validateRegisterOrganization;
exports.validateAuthOrganization = validateAuthOrganization;