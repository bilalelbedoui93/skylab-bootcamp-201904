// const path = process.argv[2];
// const  type = process.argv[3]

// const fileSys = require('fs')

// fileSys.readdir(path, (err, list) => {
//     if (err)
//         throw err;
//         for(var i=0;i<list.length;i++){
//             const a = list[i].split('.')
//                 if(type === a[a.length-1] && a.length>1){
//                     console.log(list[i])
//                 }
//         }
    
//     })

 /*----------------------------------------------------------------------*/

const fs= require('fs')
const path = require('path')

const { argv: [,, folder, ext]} = process

fs.readdir(folder, (error, files)=> {

    if (error) throw error;

    const filtered = files.filter(file => path.extname(file) === `.${ext}`)

    filtered.forEach(element => console.log(element))

    //files.forEach(file => path.extname(file) === `.${ext}` && console.log(file))

})

