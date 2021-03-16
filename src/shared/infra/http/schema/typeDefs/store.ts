import { gql } from 'apollo-server';

const store = gql`
  type Query {
    store: String
  }
`;

export default store;
