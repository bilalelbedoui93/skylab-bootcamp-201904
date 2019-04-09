/**
 * 
 * 
 * 
 */

var array=[5,6,5,3,9];

  function callback(x){ 
    return x*2; 
  }

 function map(array, callback){
    var newarr=[];
    for(i=0;i<array.length;i++){
     
     newarr[i]=callback(array[i]);
    }
   return newarr;
}

console.log(map(array,callback));