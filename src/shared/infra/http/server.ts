import { ApolloServer, gql } from 'apollo-server';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4100;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const typeDefs = gql`
  type Query {
    helloMarketplace: String
  }
`;

const resolvers = {
  Query: {
    helloMarketplace: () => 'Hello Marketplace',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IS_PRODUCTION,
  introspection: !IS_PRODUCTION,
  tracing: !IS_PRODUCTION,
});

server.listen(PORT).then(({ url }) => {
  console.info(`💾 Server running at ${url}`);
});
