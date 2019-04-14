'use strict'

describe('join', function(){

    it('should check that the array has been provided', function(){

        //var array=[];

        try{
            join()
        }catch (error){
            expect(error.message, 'Introduce an array please', false)
        }

    });

    it('will check we get a correct result', function(){

        var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];


        var expectedResult="spray-limit-elite-exuberant-destruction-present-"
        var result=join(words,('-'));

        expect(result, expectedResult, false);
        
        var expectedResult1='spraylimiteliteexuberantdestructionpresent';
        var result1=join(words,(''));

        expect(result1, expectedResult1, false);
        

    });


})