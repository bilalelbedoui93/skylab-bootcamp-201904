describe('splice', function(){
    
    true && it('should check that it works correctly', function(){

        var months = new Hooray('Jan', 'March', 'April', 'June','jul','sep','oct','nov');

        var resultExpected={0: "Jan",1: "hjy",2: "642",3: "sep",4: "oct",5: "nov",length: 6}
        var result=months.splice(1, 4,'hjy','642');

        expect(result).toEqual(resultExpected);
    });
});