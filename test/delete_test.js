const User = require('./../src/user')
const assert = require('assert');

describe('Remove an User', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            done();
        })
    });

    it('Remove based on model', (done) => {
        joe.remove()
            .then(() =>
                User.findOne({ name: 'Joe' })
            )
            .then((user) => {
                assert(user == null);
                done();
            });
    });

    it('Class remove method', (done) => {
        User.remove({ name: 'Joe' })
            .then(() =>
                User.findOne({ name: 'Joe' })
            )
            .then((user) => {
                assert(user == null);
                done();
            });
    });

    it('Class remove findOneAndRemove', (done) => {
        User.findOneAndRemove({name:'Joe'})
        .then(() =>
                User.findOne({ name: 'Joe' })
            )
            .then((user) => {
                assert(user == null);
                done();
            });
    });

    it('Class remove findByIdAndRemove', (done) => {
        User.findOneAndRemove({_id:joe._id})
        .then(() =>
                User.findOne({ name: 'Joe' })
            )
            .then((user) => {
                assert(user == null);
                done();
            });
    });
});