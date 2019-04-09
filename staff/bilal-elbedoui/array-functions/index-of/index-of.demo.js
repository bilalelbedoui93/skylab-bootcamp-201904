console.log('Case 1');

console.log(indexOf(beasts, aString));


console.log('Case 2 Error')
try {
console.log(indexOf(aString, aString)); 
} catch (error) {
  console.error(error.message);
}


console.log('Case 3 Error')
try {
console.log(indexOf(beasts, func));  
} catch (error) {
  console.error(error.message);
}