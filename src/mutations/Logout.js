import gql from 'graphql-tag';

export const LOGOUT_MUTATION = default gql`
  mutation {
    logout {
      id
      email
    }
  }
`;
