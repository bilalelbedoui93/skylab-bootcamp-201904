// const file=process.argv[2]
// const fileSys=require('fs')

// var a = fileSys.readFileSync(file).toString()

// const b=a.split('\n')

// console.log(b.length-1)


/*-----------------------------------------------------------------------*/

// const {argv: [,,path]} = process

// const file = process.argv[2]

// const fileSys = require ('fs')

// const bu=fileSys.readFileSync(path).toString().split('\n')

// console.log(bu.length-1)

/*-----------------------------------------------------------------------*/

const {argv: [,,path]} = process
const fileSys = require ('fs')
const bu=fileSys.readFileSync(path , 'utf8')
const lines= bu.match(/\n/g).length

console.log(lines)


