const mongoose = require('mongoose')
const express = require('express');
const { Field } = require('../data/event-data/modelos/medical-fields');
const { EventType} = require('../data/event-data/modelos/eventType');


const logic = {
    // medical-field
    async createMedicalField({name}) {

        const field = new Field({
            name
        })
        try {
            return await field.save();
        } catch (err) {
            for (field in err.errors)
                return await err.errors[field].message;
        }
    },

    async getOnefield(id) {
        return await Field.findById(id)
    },

    async getAllfields() {
        return await Field.find()
    },

    //event-type

    async createEventType({name}){
        const eventType = new EventType({
            name
        })
        try {
            return await eventType.save();
        } catch (err) {
            for (field in err.errors)
                return await err.errors[field].message;
        }
    },

    async getOneEventType(id){
        return await EventType.findById(id)
    },

    async getAllEventType() {
        return await EventType.find()
    },




}

module.exports = logic
