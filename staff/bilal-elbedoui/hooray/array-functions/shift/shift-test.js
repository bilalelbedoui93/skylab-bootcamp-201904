describe('shift',function(){
    
    var hooray= new Hooray('bil','dan','car','mic');
    
    true && it('Should check that the first value has removed from the hooray', function(){

        var resultExpected='bil';
        var result=hooray.shift();

    });

    true && it('Should check that the hooray has been alterated', function(){

        hooray.shift();
        var resultExpected=new Hooray('dan','car','mic');
        var result=console.log(hooray);
        
        expect(result).toBe(resultExpected);

    });
});