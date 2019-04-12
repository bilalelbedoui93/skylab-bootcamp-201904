/**
 * 
 * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 */


function reverse(array){

  if(!(array instanceof Array)) throw TypeError('value introduced is not an array')

  var newarr=[];
  var counter=0

  for(i=array.length-1;i>=0;--i){
    if(typeof array[i]==='function'){
        throw TypeError('cannot introduce function in an array');
    }else{
      newarr[counter]=array[i];
      counter++;
    }
  }
  return newarr;
    
}

