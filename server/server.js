const express = require('express');
const session = require('express-session');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const schema = require('./schema/schema');

// const models = require('./models');
// const expressGraphQL = require('express-graphql');
// const passportConfig = require('./services/auth');

const User = require('./models/user');
// Express Application Setup
const app = express();
const MONGO_URI =
  'mongodb+srv://a1ya1k2a9:aI5hJPXVX0iWaG4H@cluster0.zrvfzm9.mongodb.net/?retryWrites=true&w=majority';
if (!MONGO_URI || MONGO_URI.length === 0) {
  throw new Error('You must provide a Mongo Atlas URI');
}

// MongoDB Connection
// mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => console.log('Connected to Mongo Atlas'));
mongoose.model('user', User).on('error', (err) => {
  console.error('Error connecting to Mongo Atlas', err);
});

//   Sessison Management
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'abcdef',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  })
);

// Passport.js Setup
app.use(passport.initialize());
app.use(passport.session());

// GraphQL Setup
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

// Webpack Setup
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

// export default app;
module.exports = app;
