var array = [56,78,98,423];


function shift(array){
  var el=array[0];
  for(i=1;i<array.length;i++){
      array[i-1]=array[i];
  }
  array.length=array.length-1;
  return el;
    
}

console.log(shift(array));
console.log(array);