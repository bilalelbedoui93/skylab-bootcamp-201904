const htttp = require('http')

const { argv: [, , url] } = process

htttp.get(url, response => {
    
    
    response.setEncoding('utf8')

    response.on('data',function(data){
        console.log(data)
    })

    response.on('error', error => {
        throw error
    })

})