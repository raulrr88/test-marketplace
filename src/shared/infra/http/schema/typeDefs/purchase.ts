import { gql } from 'apollo-server';

const purchase = gql`
  type Purchase {
    id: ID!
    product: Product!
    marketplaceFee: Int!
    storeFee: Int!
    paymentPlatformFee: Int!
    createdAt: Float!
    updatedAt: Float!
  }

  input PurchaseInput {
    id: ID
    productId: String!
  }

  extend type Query {
    purchase(id: ID): Purchase
    purchases: [Purchase]
  }

  extend type Mutation {
    addPurchase(purchase: PurchaseInput): Purchase
  }
`;

export default purchase;
