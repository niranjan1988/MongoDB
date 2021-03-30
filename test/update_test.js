const User = require('./../src/user')
const assert = require('assert');

describe('Update a User', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            done();
        })
    });

    function assertName(operation,done) {
        operation.then(() => User.findOne({ name: 'Alex' }))
            .then(users => {
                assert(users.name == 'Alex');
                done();
            })
    }

    it('Instance type using set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(),done);
    });

    it('Model Instance can update', (done) => {
        assertName(joe.update({ name: 'Alex' }),done);
    });

    it('Class based update', (done) => {
        assertName(User.updateOne({ name: 'Joe' },{name:'Alex'}),done);
    });

    it('Class based update', (done) => {
        assertName(User.findOneAndUpdate({ name: 'Joe' },{name:'Alex'}),done);
    });

    it('Class based update by _id', (done) => {
        assertName(User.findByIdAndUpdate(joe._id,{name:'Alex'}),done);
    });

    //====================================================================================================

    xit('Increment the postCount of  users by 1 on the Mongodb side', (done) => {
        User.updateMany({name:'Joe'},{$inc:{postCount:1}})
        .then(()=> User.findOne({name:'Joe'}))
        .then((user)=> {
            assert(user.postCount == 1);
            done();
        })
    });
});