'use strict'

suite('Index-of', function(){

    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    var value= 'bison';

    test('return the element position in an array', function(){
        
        var expectedResult= 1;
        
        var result=indexOf(beasts, value);

        expect(result,expectedResult);
        

    });

    test('should break on undefined array', function(){

    });
});