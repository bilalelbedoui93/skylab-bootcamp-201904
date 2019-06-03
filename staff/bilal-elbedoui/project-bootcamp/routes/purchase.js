const express=require('express')
const router = express.Router()
const logic = require('../logica/index')
const auth = require('../middleware/auth')
const handleErrors = require('../middleware/handle-errors')

router.post('/:id', auth, (req,res) => {

    handleErrors(async() =>{
        debugger
       
       await logic.makePurchase(req.params.id, req.user, req.body)
        debugger
       res.json('Purchase done')
    }, res)

})

module.exports=router;