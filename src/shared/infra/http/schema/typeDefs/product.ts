import { gql } from 'apollo-server';

const product = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    purchases: [Purchase]
    store: Store
    createdAt: Float!
    updatedAt: Float!
  }

  input ProductInput {
    id: String
    name: String!
    price: Float!
    storeId: String!
  }

  input ProductUpdateInput {
    id: String!
    name: String
    price: Float
  }

  extend type Query {
    product(id: ID): Product!
    products: [Product]
  }

  extend type Mutation {
    addProduct(product: ProductInput): Product
    updateProduct(product: ProductUpdateInput): Product
    deleteProduct(id: String): String
  }
`;

export default product;
