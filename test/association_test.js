const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const { populate } = require('../src/user');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());

    });

    it('Saves relation b/w user, blogPost and comment', () => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .populate()
            .then(u => {
                // It should fail
                assert(u.blogPosts[0].content === null);
                done();
            });
    });

    it('Should populate all details including comments', () => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then(u => {
                // It should fail       
                assert(u.blogPosts[0].comments[0].user.name == 'J')
                done();
            });
    });
});
