import { gql } from 'apollo-server';

const store = gql`
  type Store {
    id: ID
    name: String
    feePercentage: Int
    # products: Product[]
    # purchases: Purchase[]
    createdAt: Float
    updatedAt: Float
  }

  input StoreInput {
    name: String
    feePercentage: Int
  }

  type Query {
    stores: [Store]
  }

  type Mutation {
    store(store: StoreInput): Store
  }
`;

export default store;
