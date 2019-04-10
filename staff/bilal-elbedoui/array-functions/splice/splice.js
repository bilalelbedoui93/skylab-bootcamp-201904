/***
 * 
 * 
 * 
 * 
 * 
 */


var myFish = ['angel', 'clown', 'mandarin', 'sturgeon', 'bilal','ghk'];

function splice(array, valuePosition, valueDelete){
    debugger
    if(arguments.length===2){
      
      array.length=arguments[1];
      return array;
        
     }else if(arguments.length===3){
          
        //posicion3, borra 2
        var elementsRemoved=[];
        var counter=0;
        var lastposition=arguments[1]+arguments[2]-1;
        
        for(i=arguments[2];i<lastposition;i++){
           elementsRemoved[counter]=array[i];
          counter++;
        }
       
       
       for(i=0;i<array.length;i++){
         for(j=0;j<elementsRemoved.length;j++){
           if(elementsRemoved[j]===array[i]){
             array[i]=0;
           }
         }
         
       }
       return array;
    }else if(arguments.length >= 4){
         return ;
    }else{
        return "this function is not receiving any value";
    }
    
}

console.log(splice(myFish, 3,2));