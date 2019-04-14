/**
 * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * 
 */

//var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
//var value='bison';

function indexOf(array, value){

    if(!(array instanceof Array)) throw TypeError(array+' is not an array');
    if(typeof value === 'function') throw TypeError(value+' is a function');

    for(i=0;i<array.length;i++){
        if(value===array[i]){
            return i;
        }
    }
   return -1;
}

