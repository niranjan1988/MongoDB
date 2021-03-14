const User = require("../src/user")
const assert = require('assert');

describe("Reading users from database", () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            done();
        });
    })

    it("Find all with name Joe", (done) => {
        User.find({ name: 'Joe' }).then((users) => {
            console.log(users);
            assert(users[0]._id.toString() == joe._id);
            done();
            
        })
    })

    it("Find all with particular id", (done) => {
        User.findOne({ _id: joe._id }).then((users) => {
            console.log(users);
            assert(users.name == joe.name);
            done();
            
        })
    })
})