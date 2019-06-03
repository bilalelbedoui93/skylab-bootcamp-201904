const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const logic = require('../logica');
const lodash = require('lodash');
const handleErrors = require('../middleware/handle-errors')


router.get('/me', auth, (req, res) => {

    handleErrors(async() => {
    
        const orga = await logic.retrieveOrganization(req.user._id)
        res.json(orga);
    
    }, res)
})

router.post('/', (req, res) => {

    handleErrors(async() => {
        const orga = await logic.createOrganization(req.body)
    
        const token = orga.generateAuthToken()
        res.header('x-auth-token', token).send(lodash.pick(orga, ['_id', 'organizationName', 'organizationMail']));
    }, res)

})

router.post('/auth', (req, res) => {
debugger
    handleErrors(async() => {
        const orga = await logic.authenticateOrganization(req.body)
        const token = orga.generateAuthToken()
        res.send({ message: 'You are logged...', token })

    }, res)


})



module.exports = router;