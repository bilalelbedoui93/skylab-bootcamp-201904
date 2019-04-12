/**
 * 
 * The map() method creates a new array with the results of calling a provided function on every element in the calling array.
 * 
 * @param {array} array the array to iterate
 * 
 * @param {callback} callback the function will be executed to iterate the array
 * 
 */

var array=[5,6,5,3,9];

  function callback(x){ 
    return x*2; 
  }

 function map(array, callback){

  if(!(array instanceof Array)) throw TypeError('is not an array');
  if(typeof callback !== 'function') throw TypeError('the second argument should be a function');

    var newarr=[];
    for(i=0;i<array.length;i++){
     
     newarr[i]=callback(array[i]);
    }
   return newarr;
}

console.log(map(array,callback));