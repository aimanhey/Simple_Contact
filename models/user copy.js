const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const userSchema = new Schema({
    post: {
      type: String,
      minlength: 2
    },
    phoneNumber: Number
 },{
    timestamps: true,
    
  });

 



// Create the model class
const Post = mongoose.model('post', userSchema);

// Export the model
module.exports = Post;