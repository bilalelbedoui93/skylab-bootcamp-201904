'use strict'
describe('is array testing', function(){

it('shoud check is it works correctly', function(){

    var array=[5,6,4,3];
    
    var expectedResult= true;

    var result= isArray(array);
    expect(result,expectedResult);

    var expectedResult1= false;

    var result= isArray(undefined);
    expect(result,expectedResult1);



});


})