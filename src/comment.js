const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({   
    content: string,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

const Comment = mongoose.model('comment',CommentSchema);

module.exports = Comment;