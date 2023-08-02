const fs = require('fs');
const path = require('path');
const controller = require('../server/controllers/userController.js');
const { error } = require( 'console' );

describe('controller unit tests', () => {
    beforeAll(async () => {
    });


    afterAll(async ()=> {
        
    });

    describe('createUser', ()=> {
        it('creates a user in the database', async ()=> {

            const req = {
                body: {
                    
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
            }

            const res = await controller.createUser(req);
            expect(res).not.toBeInstanceOf(error);
        });


        it('expected functionality', ()=> {
            controller.function
            expect().toEqual(); 
        })

    });

})