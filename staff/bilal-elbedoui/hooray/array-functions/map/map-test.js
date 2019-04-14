'use strict'

describe('map', function(){

    it('will check that the values introduced are an array and a callback', function(){

        try{
            map();

            throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'is not an array', false)
        }

    });

    it('will check that the values introduced are an array and a callback', function(){
        var aString='bilal';
        var numbers =[1,2,3];
        try{
            map(numbers,aString);

            throw Error('should not reach this point');

        }catch(error){
            expect(error.message,'the second argument should be a function');
        }

    });
  
    it('should check that we get the correct results', function(){
        
        var array=[10, 12, 10, 6, 18];
        function callback(x){ 
            return x*2; 
          };

        var expectedResult=[20, 24, 20, 12, 36]
        var result = map(array,callback);

        expect(result, expectedResult, true);
 
    
    });
});
