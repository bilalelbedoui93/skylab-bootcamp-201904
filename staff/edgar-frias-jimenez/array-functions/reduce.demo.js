console.log('-----');
console.log('DEMO', 'reduce');

var myarray = [0, 1, 2, 3, 4];
console.log('Case 1a, reduce numbers', myarray);
console.log(reduce(myarray, function(a, b){ return a + b; }));
// Expects 10

console.log('Case 1b, reduce numbers with an initial value passed', myarray);
console.log(reduce(myarray, function(a, b){ return a + b; }, 10));
// Expects 20

var myarrayofletters = ['r', 'y', 'b', 'a', 'v'];
console.log('Case 2, reduce letters', myarrayofletters);

console.log(reduce(myarrayofletters, function(a, b){ return a + b; }));
// Expects 'rybav'