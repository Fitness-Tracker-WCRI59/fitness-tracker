/.nst fs = require('fs');
const path = require('path');
const controller = require('../server/controllers/userController.js');
const { error } = require( 'console' );

describe('controller unit tests', () => {
    beforeAll(async () => {
        const userObj = {
            username: 'username',
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            age: 28,
            sex: 'sex',
            height: 100,
            weight: 150,
            goal: 130
        }
    });

    afterAll(async ()=> {
        
    });

    describe('createUser', ()=> {
        xit('creates a user in the database', ()=> {
            controller.function
            const res = controller.createUser(userObj);
            expect(res).not.toBeInstanceOf(error);
        });

        xit('expected functionality', ()=> {
            controller.function
            expect().toEqual(); 
        })


    });

})