const mongoose = require('mongoose')
const express = require('express');
const app = express();

(async () => {
    mongoose.connect('mongodb://localhost/project', {useNewUrlParser:true})

        try{
            console.log('connected to the project database...')
        }catch(err){
            console.log('ERROR, could not connect to the dataBase...')
        }
})()

app.use(express.json());
app.use('/api/medical-fields', require('./routes/medical-fields'))
app.use('/api/eventType', require('./routes/eventType'))




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}...`))