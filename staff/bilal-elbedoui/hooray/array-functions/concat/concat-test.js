'use strict'

describe('concat', function(){


    it('should check if the function works properly',function(){
        var x = [5,'b',2];
        var y = ['d',true,'f'];
        
        var expectedResult= [5, 'b', 2, 'd', true, 'f'];
    
        var Result=concat(x,y);
    
        expect(Result, expectedResult, true);
    });


    it('should check if the first argument is an array', function(){

        var a = [5,'b',2];
        var b = ['d',true,'f'];
    
    try{
        concat(8,b);
    
        throw Error('should not reach this point');
    
    }catch(error){
        expect(error.message, 'the first argument is not an array');
    }
    
    });
    

    it('should check if the second argument is an array', function(){

    var a = [5,'b',2];
    var b = ['d',true,'f'];

    try{
    concat(a,6);

    throw Error('should not reach this point');

    }catch(error){
        expect(error.message, 'the second argument is not an array');
    }

    });



})