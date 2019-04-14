'Use strict';

console.log('Case 1 - ok');

console.log(indexOf(beasts, 'bison')); //1

console.log('Case 2 - ok');

console.log(indexOf(beasts, 'duck')); //3

console.log('Case 3 - ok');

console.log(indexOf(beasts, 56)); //1



console.log('Case 1 Error')
try {
    console.log(indexOf(aString, aString)); 
} catch (error) {
    console.error(error.message);
}


console.log('Case 2 Error')
try {
    console.log(indexOf(beasts, func));  
} catch (error) {
    console.error(error.message);
}