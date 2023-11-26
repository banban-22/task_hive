// import bcrypt from 'bcrypt-nodejs';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  email: String,
  password: String,
});

// Middleware: Hash the password before saving to the database
UserSchema.pre('save', function save(next) {
  const user = this;

  //   Check if the password has been modified before hashing
  if (!user.isModified('password')) {
    return next();
  }

  //   Generate a salt and hash the password
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

// attach comparePassword method to UserSchema
UserSchema.methods.comparePassword = function comparePassword(
  userPassword,
  callback
) {
  bcrypt.compare(userPassword, this.password, (error, isMatch) => {
    callback(error, isMatch);
  });
};

// Create the 'user' model with the UserSchema
mongoose.model('user', UserSchema);
