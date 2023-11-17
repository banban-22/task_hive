import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const User = mongoose.model('user');

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  User.frindById(id, (error, user) => {
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
  if (!email || !password) {
    throw new Error('You must provide an email and password');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('This email address is already in use');
    }

    const user = new User({ email, password, name });
    await user.save();

    await new Promise((resolve, reject) => {
      req.login(user, (error) => {
        if (error) {
          reject(error);
        }
        resolve(user);
      });
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async ({ email, password, req }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const authenticateAsync = (options) => {
      return new Promise((resolve, reject) => {
        passport.authenticate('local', (error, user) => {
          if (error) {
            reject(error);
          }
          if (!user) {
            reject('Incorrect email or password');
          }
          req.login(user, () => {
            resolve(user)(options);
          });
        });
      });
    };

    await authenticateAsync({ body: { email, password } });
  } catch (error) {
    throw error;
  }
};

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

export default { signup, login };
