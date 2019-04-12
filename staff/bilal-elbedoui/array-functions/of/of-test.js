'use strict'
describe('of', function(){
    it('should check that there is no functions in the arguments', function(){
        
        var func=new Function;

        try{
            of(45,'hfg', 'bilal', func);

            throw Error("shouldn't reach this point");
        }catch(error){
            expect(error.message,'cannot introduce functions')
        }
    });

    it('should check that the function is working properly', function(){

        
        var expectedResult=[45,'hfg','bilal'];

        var result=of(45,'hfg','bilal');

        expect(result, expectedResult, true);
    });
});