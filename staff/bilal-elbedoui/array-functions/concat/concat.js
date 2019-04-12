/**
 * the concat method is used to merge two or more array
 * 
 * @param {array} a of the arrays will be concatenated
 * @param {array} b the second array that will be concatenated
 *  
 */
var a = ['a','b','c'];
var b = ['d','e','f'];

function concat(a,b){

if(!(a instanceof Array )) throw TypeError("the first argument is not an array");
if(!(b instanceof Array)) throw TypeError("the second argument is not an array");

var array=[];
for(var i=0;i<a.length;i++){
    array[i]=a[i];  
}
for(var j=0;j<b.length;j++){
    array[a.length+j]=b[j];
}
return array;
}
