var array = ['mich','bil','dan', 563,5]

console.log(filter(array, function(x){ if(typeof x ==='string') return true;}));

["mich", "bil", "dan"]