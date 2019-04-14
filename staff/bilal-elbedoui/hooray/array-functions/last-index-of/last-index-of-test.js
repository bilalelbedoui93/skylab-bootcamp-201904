'use strict'

describe('last-index', function(){

    it('will check that an array has been provided', function(){
        
        try{
            lastIndexOf(69)
        }catch (error){
            expect(error.message, 'the first argument is not an array')
        }
    });

    it('will check that the function is working fine', function(){

        var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var value='bison';
        var value1='bil'

        var result = lastIndexOf(beasts, value);
        var expectedResult = 4;

        expect(result, expectedResult, false);

        var result1 = lastIndexOf(beasts, value1);
        var expectedResult1 = -1;

        expect(result1, expectedResult1, false);

    });

});