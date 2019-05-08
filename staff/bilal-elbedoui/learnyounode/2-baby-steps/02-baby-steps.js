// const [,, ...numbers] = process.argv

// console.log(numbers.reduce((accum, number) => Number(accum)+Number(number), 0))


var result = 0

for(var i=2; i<process.argv.length;i++){
    result=result+Number(process.argv[i])
}

console.log(result)