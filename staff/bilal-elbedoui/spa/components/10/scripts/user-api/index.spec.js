'use strict'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: { id } } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)

                done()
            })
        })

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function (response) {
                    expect(response).toBeDefined()

                    const { status, error } = response

                    expect(status).toBe('KO')
                    expect(error).toBe(`user with username \"${username}\" already exists`)

                    done()
                })
            })
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        // TODO password fail cases
    })

    describe('authenticate', () => {
        beforeEach(done => userApi.create(name, surname, username, password, done))

        it('should succed on correct user', done => {
            userApi.authenticate(username, password, function (response) {
                expect(response).toBeDefined()

                const { status, data: { id, token } } = response

                expect(status).toBe('OK')
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
                expect(typeof token).toBe('string');
                expect(token.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on incorrect password', done => {
            userApi.authenticate(username, 'hola', function (response) {

                expect(response).toBeDefined()

                const { status, error } = response

                expect(status).toBe('KO')
                expect(error).toBe(`username and/or password wrong`)

                done()
            })
        })

        it('should fail on incorrect user', done => {
            const email = `manuelbarzi-${Math.random()}@gmail.com`
            userApi.authenticate(email, password, function (response) {

                expect(response).toBeDefined()

                const { status, error } = response

                expect(status).toBe('KO')
                expect(error).toBe(`user with username \"${email}\" does not exist`)

                done()
            })
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => userApi.authenticate(username, password, () => { })).toThrowError(ValueError, 'password is empty')
        })
    })


    describe('retrieve', () => {


        beforeEach(done => userApi.create(name, surname, username, password, done))


        it('should succed on correct user', done => {
            userApi.authenticate(username, password, function (response) {

                
                const { status, data: { id, token } } = response

                userApi.retrieve(id, token, function (responseretrieve){

                    const { status, data: { name: retrieveName, surname: retrieveSurname, username: retrieveUsername, id: retrieveID } } = responseretrieve;

                    expect(responseretrieve).toBeDefined()

                    expect(status).toBe('OK')
                    expect(typeof retrieveName).toBe('string')
                    expect(typeof retrieveSurname).toBe('string')
                    expect(typeof retrieveUsername).toBe('string')
                    expect(typeof retrieveID).toBe('string')

                    expect(retrieveName.length).toBeGreaterThan(0)
                    expect(retrieveSurname.length).toBeGreaterThan(0)
                    expect(retrieveUsername.length).toBeGreaterThan(0)
                    expect(retrieveID.length).toBeGreaterThan(0)

                    expect(retrieveName.length).toBeGreaterThan(0)
                    expect(retrieveSurname.length).toBeGreaterThan(0)
                    expect(retrieveUsername.length).toBeGreaterThan(0)
                    expect(retrieveID.length).toBeGreaterThan(0)

                    expect(name === retrieveName).toBeTruthy()
                    expect(surname === retrieveSurname).toBeTruthy()
                    expect(username === retrieveUsername).toBeTruthy()
                    expect(id === retrieveID).toBeTruthy()

                    done()
                })

            })
        })
    })
})