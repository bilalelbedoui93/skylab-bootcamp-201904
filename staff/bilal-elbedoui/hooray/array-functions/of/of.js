/**
 * creates a new Array from a variable number of arguments, regardless of number or type of the arguments.
 * 
 * 
 */
function of(){
  
  var array=[]
  for(var i=0;i<arguments.length;i++){
       if(typeof arguments[i]==='function'){
        throw TypeError('cannot introduce functions')
       }else{
        array[i] = arguments[i];
       }
  }
return array;
}