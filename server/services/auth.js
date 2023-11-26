// import mongoose from 'mongoose';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const User = mongoose.model('user');
const User = mongoose.model('user');

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id, (error, user) => {
    callback(error, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    User.findOne({ email: email.toLowerCase() }, (error, user) => {
      if (error) {
        return callback(error);
      }
      if (!user) {
        return callback(null, false, 'Incorrect email or password');
      }
      user.comparePassword(password, (error, isMatch) => {
        if (error) {
          return callback(error);
        }
        if (isMatch) {
          return callback(null, user);
        }

        return callback(null, false, 'Incorrect email or password');
      });
    });
  })
);

const signup = async ({ email, password, req }) => {
  const user = new User({ email, password });

  if (!email || !password) {
    throw new Error('You must provide an email and password');
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('This email address is already in use');
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
};

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('You must provide an email and password');
      }
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

// const logout = (req) => {
//   return new Promise((resolve, reject) => {
//     try {
//       req.logout();
//       resolve('Logout successful');
//     } catch (error) {
//       reject(`Logout failed ${error}`);
//     }
//   });
// };

// export default { signup, login };
module.exports = { signup, login };
