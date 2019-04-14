/**
 * 
 * 
 * 
 * 
 */


var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

function slice (array, positions){
   
     var newarr=[];
     var counter=0;
     if(arguments.length===2){
       
       for(i=arguments[1];i<array.length;i++){
           newarr[counter]=array[i];
           counter++;      
       }  
       return newarr;
       
     }else if(arguments.length===3){
       
       for(i=arguments[1];i<arguments[2];i++){
           newarr[counter]=array[i];
           counter++;      
       }  
       return newarr;
       
     }else{
       
         return "please introduce just one number";
       
     }
 }

console.log(slice(animals, 2, 4,6))