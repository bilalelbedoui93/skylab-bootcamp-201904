/**
 * 
 * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present
 * 
 * @param {array} array where we will look for the value
 * @param {value} value the value that we have to figure out its postion
 * 
 */

function lastIndexOf(array, value){

    if(!(array instanceof Array)) throw TypeError('the first argument is not an array');

        for(i=array.length;i>=0;i--){
            if(value===array[i]){
                return i;
            }      
        }
    return -1;
}
