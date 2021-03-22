const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'My first message', }],
            postCount: 1
        });

        joe.save()
            .then(() => { return User.findOne({ name: 'Joe' }) })
            .then((user) => {
                assert(user.posts[0].title == 'My first message');
                done();
            })

    });

    it('Save subdocument to existing document', (done) => {
        const joe = new User({
            name: 'Joe',
            postCount: 1,
            posts: []
        });

        joe.save().then(() => {
            return User.findOne({ name: 'Joe' });
        })
            .then((user) => {
                user.posts.push({ title: 'First post' });
                return user.save();
            })
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then((user) => {
                assert(user.posts[0].title == 'First post');
                done();
            })
    });
});