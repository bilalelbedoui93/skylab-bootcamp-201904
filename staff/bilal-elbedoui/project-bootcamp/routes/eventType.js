const logic = require('../logica');
const express = require('express');
const { validate } = require('../data/event-data/modelos/eventType')
const router = express.Router();

router.get('/', async (req, res) => {
    const eventType = await logic.getAllEventType();
    res.send(eventType);
})

router.get('/:id', async (req,res) => {
    const eventType = await logic.getOneEventType(req.params.id)
    res.send(eventType);
})

router.post('/', async (req,res)=> {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const eventType = {
        name:req.body.name
    }

    const result = await logic.createEventType(eventType)
    res.send(result);

})

module.exports=router;