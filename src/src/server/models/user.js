import bcrypt from 'bcrypt-nodejs';
// import crypto from 'crypto';
import mongoose from 'mongoose';

const { Schema } = mongoose;

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
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    callback(error, isMatch);
  });
};

// Create the 'user' model with the UserSchema
mongoose.model('user', UserSchema);
