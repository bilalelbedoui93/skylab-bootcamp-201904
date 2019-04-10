'use strict'

describe('Index-of', function(){

    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    var value= 'bison';

    it('return the element position in an array', function(){
        
        var expectedResult= 1;
        
        var result=indexOf(beasts, value);

        expect(result,expectedResult);
        

    });

    it('should break if the first argument is not an array '){
        console.log('Case 1 Error')
        
        try {
        console.log(indexOf('noArray', aString)); 
        } catch (error) {
        console.error(error.message);
            }
    }

});