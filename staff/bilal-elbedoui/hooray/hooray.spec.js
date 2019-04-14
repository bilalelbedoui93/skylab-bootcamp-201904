'use strict';

describe('hooray', function () {
    describe('constructor', function () {
        true && it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
            expect(Object.keys(hooray).length).toBe(4);
        });

        true && it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        true && it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
        });

        true && it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length, hooray).toBe(length);
        });

        true && it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
        });
    });

    describe('forEach', function () {
        true && it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(result).toEqual(hooray);

            var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

            expect(hooray.length).toEqual(expected.length);
        });

        true && it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length).toBe(0);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.forEach();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('is-array testing', function(){

        true && it('shoud check is it works correctly', function(){
    
            var hooray= new Hooray(5,6,4,3);
            var string='bilal'
        
            var expectedResult= true;
            var result= Hooray.prototype.isArray(hooray);

            expect(result).toBe(expectedResult);
    
            var expectedResult1= false;
            var result1= Hooray.prototype.isArray(string);
            
            expect(result1).toBe(expectedResult1);
        });
    
    });

    describe('last-index', function(){

        it('will check that the function is working fine', function(){
    
            var beasts = new Hooray('ant', 'bison', 'camel', 'duck', 'bison');
            var value='bison';
            var value1='bil'
    
            var result = beasts.lastIndexOf(value);
            var expectedResult = 4;
    
            expect(result).toBe(expectedResult);
    
            var result1 = beasts.lastIndexOf(value1);
            var expectedResult1 = -1;
    
            expect(result1).toBe(expectedResult1);
    
        });

        it('will check that an array has been provided', function(){
            
            var a=69;
            
            expect(function(){a.lastIndexOf()}).toThrowError();
            
        });
    

    
    });

    describe('filter', function(){

        it('should confirm that the function is working good', function(){
    
            var hooray = new Hooray('mich','bil','dan', 563,5);
            
            var resultExpected= new Hooray('mich','bil','dan');
            
            var result=hooray.filter(function(x){ if(typeof x ==='string') return true;});
        
            expect(result).toEqual(resultExpected);
        });
    
        true && it('should check that the second argument is a function', function(){
    
            var hooray= new Hooray('sd','sjk','sdk');
            var nofunc= 'Function';

            
            expect(function(){hooray.filter(nofunc)}).toThrowError();
    
        });
    
    });

    describe('map', function(){

 
        true && it('will check that the values is callback', function(){
            var aString='bilal';
            var numbers =new Hooray(1,2,3);
                
            expect(function(){numbers.map(aString)}).toThrowError();
    
        });
      
        true && it('should check that we get the correct results', function(){
            
            var hooray=new Hooray(10, 12, 10, 6, 18);
            function callback(x){ 
                return x*2; 
              };
    
            var expectedResult=new Hooray(20, 24, 20, 12, 36);
            var result = hooray.map(callback);
    
            expect(result).toEqual(expectedResult);
        
        });
    });

    describe('concat', function(){


        true && it('should check if the function works properly',function(){
            var x = new Hooray(5,'b',2);
            var y = new Hooray('d',true,'f');
            
            var expectedResult= new Hooray(5, 'b', 2, 'd', true, 'f');
        
            var Result=x.concat(y);
        
            expect(Result).toEqual(expectedResult);
        });
    
    
        true && it('should check that the value introduced is an array', function(){
    
            var a = new Hooray(5,'b',2);
            var b = 'new Hooray(d,true,f)';
        
            expect(function(){a.concat(b)}).toThrowError();
        
        });    
    
    });

    describe('join', function(){
  
        it('will check we get a correct result', function(){
    
            var words = new Hooray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
    
    
            var expectedResult="spray-limit-elite-exuberant-destruction-present-"
            var result=words.join(('-'));
    
            expect(result).toBe(expectedResult);            
    
        });

        it('will check we get a correct result 2', function(){
    
            var words = new Hooray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
            
            var expectedResult1='spraylimiteliteexuberantdestructionpresent';
            var result1=words.join('');
    
            expect(result1).toBe(expectedResult1);
            
    
        });    
    });

    describe('Index-of', function(){

        var beasts = new Hooray('ant', 'bison', 'camel', 'duck', 'bison');
        var value= 'bison';
    
        it('return the element position in an array', function(){
    
            var expectedResult= 1;
            
            var result=beasts.indexOf(value);
    
            expect(result).toBe(expectedResult);
            
        });
    
    
        it('should not work if the value is a function ', function(){
    
            var func= new Function;

            expect(function(){beasts(func)}).toThrowError();

        });
    
    });

    describe('of', function(){
        true && it('should check that there is no functions in the arguments', function(){
            
            var func=new Function;
            
            expect(function(){Hooray.prototype.of(45,'hfg','bilal', func)}).toThrowError();
        });
    
        true && it('should check that the function is working properly', function(){
            
            var expectedResult=new Hooray(45,'hfg','bilal');
    
            var result=Hooray.prototype.of(45,'hfg','bilal');
    
            expect(result).toEqual(expectedResult);
        });
    });

    describe('reverse', function(){

        true && it('should check that there is no function in the array', function(){
    
            var func=new Function;
            var hooray=new Hooray('sdds',54, func);

            expect(function(){Hooray.prototype.reverse(hooray)})
        });
    
        true && it('should check that the function is working properly', function(){
    
            var hooray= new Hooray(423, 98, 78, 56);

            var result=hooray.reverse();
    
            var expectedResult=new Hooray(56, 78, 98, 423);
    
            expect(result).toEqual(expectedResult);    
        });   
    });

    describe('shift',function(){
    
        
        true && it('Should check that the first value has removed from the hooray', function(){
    
            var hooray= new Hooray('bil','dan','car','mic');

            var resultExpected='bil';
            var result=hooray.shift();

            expect(result).toBe(resultExpected);
        });
    
        it('Should check that the hooray has been alterated', function(){
    
            var hooray= new Hooray('bil','dan','car','mic');

            hooray.shift();
            var resultExpected=new Hooray('dan','car','mic');
            var result=hooray;
            
            expect(result).toEqual(resultExpected);
        });
    });

    describe('slice', function(){

        true && it('should accept just numbers as arguments', function(){
    
            var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');      
    
            expect(function(){animals.slice('bilal',6)}).toThrowError();
        });

        true && it('should check that it will work with one argument', function(){

            var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');      
    
            var expectedResult= new Hooray('camel','duck', 'elephant');
            var result=animals.slice(2);
    
            expect(result).toEqual(expectedResult);
    
        });

        true && it('should check that it will work with two argument', function(){

            var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      
    
            var expectedResult= new Hooray('camel','duck', 'elephant');
            var result=animals.slice(2,5);
    
            expect(result).toEqual(expectedResult);
    
        });
    
        true && it('should check that it will not work with more than two argument', function(){
    
            var animals = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant','cat');      
    
            var expectedResult= 'Cannot introduce more than 2 arguments'
            var result=animals.slice(2,4,6);
    
            expect(result).toEqual(expectedResult);
        });
    });

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

            var result=Hooray.prototype.pop(hooray);
            
            expect(hooray).toEqual(expectedResult);
        });
    });
    describe('splice', function(){
    
        true && it('should check that it works correctly', function(){
    
            var months = new Hooray('Jan', 'March', 'April', 'June','jul','sep','oct','nov');
    
            var resultExpected=new Hooray('Jan','hjy','642','sep','oct','nov');
            var result=months.splice(1, 4,'hjy','642');
    
            expect(result).toEqual(resultExpected);
        });
    });
});
