/**
 * 
 * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 */

var array = [56,78,98,423];
var counter=0

function reverse(array){
  var newarr=[];
  for(i=array.length-1;i>=0;--i){
    newarr[counter]=array[i];
    counter++;
  }
  return newarr;
    
}

console.log(reverse(array));