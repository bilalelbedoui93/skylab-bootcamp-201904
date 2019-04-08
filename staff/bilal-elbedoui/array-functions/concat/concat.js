/**
 * the concat method is used to merge two or more array
 * 
 * 
 */

var a = ['a','b','c'];
var b = ['d','e','f'];

function concat(a,b){

var array=[];
for(var i=0;i<a.length;i++){
    array[i]=a[i];  
}
for(var j=0;j<b.length;j++){
    array[a.length+j]=b[j];
}
console.log(array);
}

concat();