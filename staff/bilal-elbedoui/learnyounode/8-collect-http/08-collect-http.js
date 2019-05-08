const http = require('http')
const bl = require('bl')

const {argv: [ , , url]} = process

// http.get(url, response => {

//     response.setEncoding('utf8')
    
//     response.on('error', error => { throw error })
    
//     let content='';

//     response.on('data', data => content=content+data)

//     response.on('end', () => console.log(`${content.length}\n${content}`))

//     })


/*------------------------------------------------------------------------------------*/

http.get(url, response => {

    response.setEncoding('utf8')

    response.pipe(bl((error, data) =>{

        if(error) throw error;

        console.log(`${data.length}\n${data}`)

    }))

})



