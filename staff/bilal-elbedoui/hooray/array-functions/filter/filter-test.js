describe('filter', function(){

    it('should confirm that the function is working good', function(){

        var array = ['mich','bil','dan', 563,5];
        
        var resultExpected=['mich','bil','dan'];
        
        var result=filter(array, function(x){ if(typeof x ==='string') return true;});
    
        expect(result, resultExpected, true);
    });

    it('should check that the first value is an array', function(){

        var array=[]
        var func= function(){};

        try{
            filter(array,func);
        }catch (error){
            expect(error.message, 'the first argument is not an array', true);
        }

    })

    it('should check that the second argument is a function', function(){

        try{
            filter(56);
        }catch (error){
            expect(error.message, 'the second argument is not a callback');
        }

    })

})