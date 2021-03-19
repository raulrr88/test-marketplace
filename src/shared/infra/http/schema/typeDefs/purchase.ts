import { gql } from 'apollo-server';

const purchase = gql`
  type Purchase {
    id: ID!
    product: Product!
    total: Float!
    marketplacePercentage: Float!
    marketplaceValue: Float!
    storePercentage: Float!
    storeValue: Float!
    paymentPlatformPercentage: Float!
    paymentPlatformValue: Float!
    createdAt: Float!
    updatedAt: Float!
  }

  extend type Query {
    purchase(id: ID): Purchase
    purchases: [Purchase]
  }

  extend type Mutation {
    addPurchase(productId: String!): Purchase
  }
`;

export default purchase;
