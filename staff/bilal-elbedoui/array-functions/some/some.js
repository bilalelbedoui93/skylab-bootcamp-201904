/****
 * 
 * Some() The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * 
 * 
 * 
 */

function callback(element) {
    // checks whether an element is even
    return element % 2 === 0;
  };
  
   function some(array, callback){
      var result;
      for(i=0;i<array.length;i++){
          if(callback(array[i])){
              return true;
          }else{
              result= false;
          }
      }
     
     return result;
   }