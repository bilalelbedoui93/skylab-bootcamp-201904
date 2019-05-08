const fileSys = require('fs')
const path = require('path')

module.exports = (folder, ext, callback) => {

    fileSys.readdir(folder, 'utf8', (err, files) => {

        if (err) return callback(err);

        const filtered = files.filter(file => path.extname(file) === `.${ext}`)

       callback(undefined, filtered)

    })
}



    





// const filter = require('./06-filter')

// const {argv: [, ,folder,ext]} = process

// module.exports = (folder, ext, cb) => {
//     false.readdir(folder, (error, files))
