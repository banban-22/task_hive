// import graphql from 'graphql';
// import { GraphQLObjectType } from 'graphql';
// import UserType from './user_type';
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      reoslve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

// export default RootQueryType;
module.exports = RootQueryType;