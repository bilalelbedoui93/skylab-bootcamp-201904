/***
 * 
 * 
 * 
 * 
 * 
 */


function splice(){
    if(arguments.length===1){
        return 1;
    }else if(arguments.length===2){
        return 2;
    }else if(arguments.length >= 3){
         return 3;
    }else{
        return "this function is not receiving any value";
    }
}