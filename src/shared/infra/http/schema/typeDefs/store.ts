import { gql } from 'apollo-server';

const store = gql`
  type Store {
    id: ID!
    name: String!
    feePercentage: Float!
    products: [Product]
    purchases: [Purchase]
    createdAt: Float!
    updatedAt: Float!
  }

  input StoreInput {
    id: String
    name: String!
    feePercentage: Int = 90
  }

  input StoreUpdateInput {
    id: String!
    name: String
    feePercentage: Int
  }

  extend type Query {
    store(id: ID): Store
    stores: [Store]
  }

  extend type Mutation {
    addStore(store: StoreInput): Store
    updateStore(store: StoreUpdateInput): Store
  }
`;

export default store;
