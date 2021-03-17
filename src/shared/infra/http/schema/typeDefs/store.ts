import { gql } from 'apollo-server';

const store = gql`
  type Store {
    id: ID!
    name: String!
    feePercentage: Int!
    # products: [Product]
    # purchases: Purchase[]
    createdAt: Float!
    updatedAt: Float!
  }

  input StoreInput {
    id: String
    name: String!
    feePercentage: Int = 90
  }

  type Query {
    store(id: ID): Store
    stores: [Store]
  }

  type Mutation {
    addStore(store: StoreInput): Store
    updateStore(store: StoreInput): Store
  }
`;

export default store;
