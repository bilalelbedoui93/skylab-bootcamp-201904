// for big files

// $ node . a.txt b.txt

const fs = require('fs')

const { argv: [, , from, to] } = process

console.log(process.memoryUsage())

const rs = fs.createReadStream(from)
const ws = fs.createWriteStream(to)

rs.on('end', () => console.log(process.memoryUsage()))
ws.on('end', () => console.log(process.memoryUsage()))

rs.pipe(ws)

