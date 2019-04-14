'use strict'

describe('Index-of', function(){

    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    var value= 'bison';

    it('return the element position in an array', function(){
        
        var expectedResult= 1;
        
        var result=indexOf(beasts, value);

        expect(result,expectedResult);
        
    });

    it('should break because the array is undefined', function(){
        
        try {
            
        indexOf();

        throw Error('should not reach this point');
        } catch (error) {
        expect(error.message, 'undefined is not an array');
        }
    });

    it('should not work if the value is a function ', function(){

        var func= function a(){};

    try{
        
     indexOf(beasts, func);

    v

    }catch(error){
        expect(error.message,  'function a(){} is a function')
    }    


    });

});