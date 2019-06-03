const auth= require('../middleware/auth')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const logic = require('../logica');
const lodash=require('lodash')
const handleErrors = require('../middleware/handle-errors')

router.get('/me', auth, (req, res) =>{

    handleErrors(async() => {
        
        const user = await logic.retrieveUser(req.user._id)
        
        res.json(user);
        
    }, res)

})

router.post('/', (req,res) => {
    
    handleErrors(async() => {
        
        const user = await logic.createUser(req.body);
        
        //const token = user.generateAuthToken();
        /*header('x-auth-token', token).*/res.json(/*lodash.pick(user,['_id','fullname', 'email'] )*/{message: 'Registered correctly...'});

    }, res)  
})

router.post('/auth', (req,res) =>{

    handleErrors(async()=> {
        
        const user = await logic.authenticateUser(req.body);

        const token = user.generateAuthToken();
    
        res.json({message: 'You are logged...', token})
    }, res)
    
})

module.exports=router;