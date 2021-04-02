const User = require('./../src/user')
const BlogPost = require('./../src/blogPost')
const assert = require('assert');
const mongoose = require('mongoose');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
       
        joe.blogPosts.push(blogPost);
       
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());

    });

    it('User remove should remove the blogposts too', (done) => {
        joe.remove()
        .then(()=> BlogPost.count())
        .then((count)=>{
            assert(count == 0);
            done();
        })
    });
});