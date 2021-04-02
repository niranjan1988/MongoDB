const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name should be greater than 2 characters'
        },
        required: [true, 'Name is required']
    },    
    posts: [PostSchema],
    likes:Number,
    blogPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

//Deletion of blogposts before deleting User
UserSchema.pre('remove',function(next){
    const BlogPost = mongoose.model('blogPost');
    // this = Joe

    BlogPost.remove({_id:{$in: this.blogPosts}})
    .then(()=> next());
})


const User = mongoose.model('user', UserSchema);

module.exports = User;
