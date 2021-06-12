const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    contact: {
      type: String,
      minlength: 2,
    },
    contactNumber: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },

  {
    timestamps: true,
  }
);

// Create the model class
const Contact = mongoose.model("contact", userSchema);

// Export the model
module.exports = Contact;
