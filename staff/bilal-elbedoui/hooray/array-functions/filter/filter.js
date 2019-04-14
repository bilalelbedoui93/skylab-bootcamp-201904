/**
 *The filter() method creates a new array with all elements that pass the test implemented by the provided function
 * 
 * 
 */

var array = [5,5,6,"mich", "bil", "dan"];

//var array = ['mich','bil','dan', 563,5];

function filter(array, callback){
    var result=[];
    var positionResult=0
     for(i=0;i<array.length;i++){
         if(callback(array[i])===true){
           result[positionResult]=array[i];
           positionResult++;
         }
     }
     return result;
 }

console.log(filter(array, function(x){ if(typeof x ==='string') return true;}));