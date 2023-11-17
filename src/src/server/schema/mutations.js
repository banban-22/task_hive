// import graphql from 'graphql';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserType from './types/user_type';
import AuthService from '../services/auth';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve(parentValue, { email, password, name }, req) {
        return AuthService.signup({ email, password, name, req });
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },

    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      },
    },
  },
});

export default mutation;
