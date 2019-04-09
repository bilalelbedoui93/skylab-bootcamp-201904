/**
 * 
 * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present
 * 
 * 
 */

 function lastIndexOf(){
    function indexOf(array, valor){
        for(i=array.length;i>=0;i--){
            if(valor===array[i]){
                return i;
            }      
        }
       return -1;
      
    
     }
    
    console.log(indexOf(beasts, valor));
 }