// const file = process.argv[2]

// const fileSys = require('fs')

//         // function callback(err, data) {
//         //     if (err) throw err;
//         //     console.log(data);
//         // }

// const buf = fileSys.readFile(file, (err, data) => {
//     if (err) throw err;
//     console.log(data.toString().split('\n').length - 1);
// })

/*--------------------------------------------------------------*/

const fs = require('fs')

const { argv: [, , path] } = process

fs.readFile(path,'utf8',(error,content) => {
    if(error) throw error;

    const lines = content.match(/\n/g).length
    
    console.log(lines)
})