const User = require('./../src/user')
const assert = require('assert');

describe('Validating records', () => {

    it('Require a user name', () => {
        const user = new User({name:undefined});
        const validationResult =  user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message == "Name is required");
    });

    it('Check if user name is longer than 2 characters', () => {
        const user = new User({name:'V'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message == "Name should be greater than 2 characters");
    });

    it('Check if error is returned on save when the name is less than 2 characters', (done) => {
        const user = new User({name:'V'});
        user.save()
        .catch(validationResult=>{
            const {message} = validationResult.errors.name;
            assert(message == "Name should be greater than 2 characters");
            done();
        })
        
    });
});
 