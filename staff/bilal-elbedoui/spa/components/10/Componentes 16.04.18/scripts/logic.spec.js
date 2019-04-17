'use strict';

describe('logic', function () {
    var name = 'Peter';
    var surname = 'Seller';
    var email = 'peterseller@gmail.com';
    var password = '123';

    beforeEach(function () {
        users.length = 0;
        
    });

    describe('register', function () {
        it('should succeed on correct data', function () {
            var user = {
                name: name,
                surname: surname,
                email: email,
                password: password
            };

            var currentUsersCount = users.length;

            logic.register(name, surname, email, password);

            expect(users.length).toBe(currentUsersCount + 1);

            var lastUser = users[users.length - 1];
            expect(lastUser).toEqual(user);
        });
        it('should fail on passing empty field', function () {
            expect(function () {
                logic.register('', surname, email, password);
            }).toThrowError(TypeError, 'Empty fields.');
            expect(function () {
                logic.register(name, '', email, password);
            }).toThrowError(TypeError, 'Empty fields.');
            expect(function () {
                logic.register(name, surname, '', '');
            }).toThrowError(TypeError, 'Empty fields.');
            expect(function () {
                logic.register(name, surname, email, '');
            }).toThrowError(TypeError, 'Empty fields.');



        });

        it ('should fail on introducing already exists email', function(){
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });

            var _error;
                
            try { 
                    logic.register(name,surname,email,password);
            } catch(error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(2);
        });
    });

    describe('login', function () {
        beforeEach(function () {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        });

        it('should succeed on correct data', function () {
            logic.login(email, password);

            expect(logic.__userEmail__).toBe(email);
            expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1);
        });

        it('should fail on wrong email (unexisting user)', function(){
            // expect(function() {
            //     logic.login('pepitogrillo@gmail.com', password);
            // }).toThrowError(Error, 'wrong credentials');

            var _error;

            try {
                logic.login('pepitogrillo@gmail.com', password);
            } catch(error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        it('should fail on wrong password (existing user)', function(){
            // expect(function() {
            //     logic.login(email, '456');
            // }).toThrowError(Error, 'wrong credentials');

            var _error;

            try {
                logic.login(email, '456');
            } catch(error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        // TODO fail cases
    });
});