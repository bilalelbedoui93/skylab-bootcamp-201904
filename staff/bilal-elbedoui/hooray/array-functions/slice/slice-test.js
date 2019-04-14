describe('slice', function(){

    true && it('should accept just numbers as arguments', function(){

        var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      

        expect(function(){animals.slice('bilal',6)}).toThrowError();

    });

    true && it('should check that it will work with one argument', function(){

        var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      

        var expectedResult= new Hooray('camel','duck', 'elephant');
        var result=animals.slice(2);

        expect(result).toEqual(expectedResult);

    });

    true && it('should check that it will work with two argument', function(){

        var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      

        var expectedResult= new Hooray('camel','duck', 'elephant');
        var result=animals.slice(2,4);

        expect(result).toEqual(expectedResult);

    });

    true && it('should check that it will not work with more than two argument', function(){

        var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      

        var expectedResult= 'Cannot introduce more than 2 arguments'
        var result=animals.slice(2,4,6);

        expect(result).toEqual(expectedResult);

    });

})