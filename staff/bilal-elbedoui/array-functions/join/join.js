/**
 * The join() method creates and returns a new string by concatenating all of the elements in an array
 * 
 * @param {array} array the array to iterate
 * @param {separate} separator the symbol that will use to separate words
 */

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];



function join(array, separate){

    if(!(array instanceof Array )) throw TypeError('Introduce an array please');

  
    var newString = '';

    if(arguments.length===1){
    
      for (var i = 0; i < array.length; i++){       
      newString = newString + array[i] + '';  
    
      }
  
     return newString

      }else{
  
      for (var i = 0; i < array.length; i++){     
      
      newString = newString + array[i]+separate;
    
      }
        
      return newString;
  
    }
}

