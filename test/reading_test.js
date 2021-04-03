const User = require("../src/user")
const assert = require('assert');

describe("Reading users from database", () => {
    let joe, maria, alex, zach;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        alex = new User({ name: 'Alex' });
        zach = new User({ name: 'Zach' });
        Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]).then(() => {
            done();
        });
    })

    it("Find all with name Joe", (done) => {
        User.find({ name: 'Joe' }).then((users) => {
            assert(users[0]._id.toString() == joe._id);
            done();

        })
    })

    it("Find all with particular id", (done) => {
        User.findOne({ _id: joe._id }).then((users) => {
            assert(users.name == joe.name);
            done();

        })
    })

    it('it can skip and limit the result set', (done) => {
        User.find({})
        .sort({name:1})  // 1 means assending order, -1 means decending order
        .skip(3)
        .limit(5)
        .then(users => {
            console.log(users);
            assert(users.length == 1);
            done();
        })
    });
})