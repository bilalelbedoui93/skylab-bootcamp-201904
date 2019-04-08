/**
 * creates a new Array from a variable number of arguments, regardless of number or type of the arguments.
 * 
 * 
 */
function of(){
    var array=[]
    for(var i=0;i<arguments.length;i++){
         array[i] = arguments[i];
    }
  return array;
} 
