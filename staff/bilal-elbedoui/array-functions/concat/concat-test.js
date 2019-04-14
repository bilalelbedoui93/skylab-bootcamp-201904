'use strict'

describe('concat', function(){


    it('should check if the function works properly',function(){
        var a = [5,'b',2];
        var b = ['d',true,'f'];
        
        var expectedResult= [5, 'b', 2, 'd', true, 'f'];
    
        var Result=concat(a,b);
    
        expect(Result, expectedResult);
    });


it('should check if both entries are arrays', function(){

    var a = [5,'b',2];
    var b = ['d',true,'f'];

try{
    concat(a,6, false);

    throw Error('should not reach this point');

}catch(error){
    expect(error.message, 'both entries have to be an array');
}

});



})