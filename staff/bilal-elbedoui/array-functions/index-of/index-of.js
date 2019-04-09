/**
 * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * 
 */

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var valor='bison';

 function indexOf(array, valor){
    for(i=0;i<array.length;i++){
        if(valor===array[i]){
            return i;
        }
    }
   return -1;

 }

console.log(indexOf(beasts, valor));