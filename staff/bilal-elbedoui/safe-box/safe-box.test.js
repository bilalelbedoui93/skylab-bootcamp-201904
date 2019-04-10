'use strict'

describe('safebox', function (){
it('shoud save the secret and return TRUE if password is ok', function (){

    var saved = safebox('123', 'my secret');

    expect(saved, true);

    var secret = safebox('123');

    expect(secret, 'my secret');

});


it('should break if password is wrong when trying to save a secret', function(){

    try{
        safeBox('456','mysecret');

        console.log('should not arrive here');
    }catch(error){
        expect(error.message, 'wrong password');
    };
    
});

it('should break if pa')


});