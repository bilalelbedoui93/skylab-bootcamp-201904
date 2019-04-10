'use strict'

suite('Index-of', function(){

    test('return the element position in an array', function(){

        var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var value= 'bison';
        
        var expectedResult= 1;
        
        var result;
        result = indexOf(beasts, value);

        expect(result,expectedResult);
        

    })
})