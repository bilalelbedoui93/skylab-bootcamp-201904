const logic = require('../logica');
const express = require('express');
const { validate } = require('../data/event-data/modelos/medical-fields')
const router = express.Router();

router.get('/', async (req, res)=>{
    const fields = await logic.getAllfields()
    res.send(fields)
})

router.get('/:id', async (req,res)=> {
    const field = await logic.getOnefield(req.params.id)
    res.send(field)
})

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    const field = {
        name:req.body.name
    }

    const result = await logic.createMedicalField(field)
    res.send(result)
})

module.exports=router;