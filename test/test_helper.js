const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/users')

    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (error) => {
            console.log('Eror!');
        });
})

beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    });
})