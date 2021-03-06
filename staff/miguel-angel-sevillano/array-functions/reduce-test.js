var a=[2,4,6,8,10]




reduce(a,function(acc,array){return acc+array})


'use strict'


describe('reduce',function(){
    it('should break if its not an array', function () {
        
        try{
            reduce();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'undefined its not an array');
        }
 
    })
    it('should break if its not a function', function (){
        
        try{
            reduce(test);
            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'undefined its not a function')
        }

    })
    it('should iterate trough the array and aplly the argument in  the callback function',function(){

       var array=[1,2,3,4,5]
       var actual=reduce(array,function(acc,array){return acc+array},4)
       var expected = 19

            

            expect(expected,actual)

    })
    it('should iterate trough the array and aplly callback function whitout ay argument pased by',function(){

        var array=[1,2,3,4,5]
        var actual=reduce(array,function(acc,array){return acc+array},)
        var expected = 15
 
             
 
             expect(expected,actual)
 
     })
   
  
})
