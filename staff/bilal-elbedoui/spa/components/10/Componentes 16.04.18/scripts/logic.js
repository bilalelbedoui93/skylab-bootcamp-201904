'use strict';

var logic = {
    register: function (name, surname, email, password) {
       if(
           (typeof name !== 'string' ||  name.length === 0) || 
           (typeof surname !== 'string' ||  surname.length === 0) ||
           (typeof email !== 'string' ||  email.length === 0) ||
           (typeof password !== 'string' ||  password.length === 0)
         ){
            var error = TypeError('Empty fields.');
            error.code = 3;
            throw error;
            }
          

        var user = users.find(function(user) { return user.email === email });
        if(user) {
            var error = TypeError('this user already exists.');
            error.code = 2;
            throw error;
        };
        
        // TODO add more validations

        // TODO verify user does not exists already, otherwise error 'user already exists'

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        // TODO validate input data
        var user = users.find(function(user) { return user.email === email });

        if (!user) {
            var error = Error('wrong credentials');
            error.code = 1;
            throw error;
        };

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            var error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };
    },
    logout: function (){
        this.__accessTime__ = '';
        this.__userEmail__ = '';
    }
}
