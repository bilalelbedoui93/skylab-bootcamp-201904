describe('some', function(){

    true && it('should check that it works correctly', function(){

        var hooray = new Hooray(1, 2, 3, 4, 5);

        var even = function(element) {
            // checks whether an element is even
            return element % 2 === 0;
        };

        var result=hooray.some(even)
        var expectedResult=true;

        expect(result).toBe(expectedResult);        
    });
});