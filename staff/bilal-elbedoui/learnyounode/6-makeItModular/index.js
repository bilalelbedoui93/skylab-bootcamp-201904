const filter = require('./filter')


const { argv: [, , folder, ext] } = process


filter (folder, ext, (error,files) =>{

    if (error) throw error

    files.forEach(element => {console.log(element)});

})


