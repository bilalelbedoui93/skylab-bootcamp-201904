describe('pop', function(){

    true && it('should that the function returns the removed value', function(){

        var hooray=new Hooray(1,2,3,4);

        var expectedResult=4;
        var result=Hooray.prototype.pop(hooray);

        expect(result).toBe(expectedResult);
    });

    true && it('should returns the hooray without the last value', function(){

        var hooray=new Hooray(1,2,3,4);

        var expectedResult=new Hooray(1,2,3);
        
        Hooray.prototype.pop(hooray);
        var result=hooray;
        expect(result).toBe(expectedResult);
    });
});