import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
