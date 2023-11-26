// import graphql from 'graphql';
// import { GraphQLSchema } from 'graphql';
// import RootQueryType from './types/root_query_type';
// import mutation from './mutations';
const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const RootQueryType = require('./types/root_query_type');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
