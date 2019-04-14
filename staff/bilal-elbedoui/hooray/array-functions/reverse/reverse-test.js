'use strict'
describe('reverse', function(){

    it('should check that the value introduced is an array', function(){

        try{
            var bilal='jdsjkds';
            reverse(bilal);

            throw Error("shouldn't reach this point");
        }catch{
            expect(error.message,'value introduced is not an array');
        }

    });

    it('should check that there is no function in the array', function(){

        var func=new Function;
        var array=['sdds',54, func];
        try{
            reverse(array)

            throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'cannot introduce function in an array')
        }
    });

    it('should check that the function is working properly', function(){

        var result=reverse([56,78,98,423])

        var expectedResult=[423, 98, 78, 56];

        expect(result, expectedResult, true);


    });   
    
});