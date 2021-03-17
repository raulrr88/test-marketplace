/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import 'reflect-metadata';
import '../../container';
import '../typeorm';
import schema from './schema';

dotenv.config();
const PORT = process.env.PORT || 4100;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const server = new ApolloServer({
  cors: true,
  schema,
  playground: !IS_PRODUCTION,
  introspection: !IS_PRODUCTION,
  tracing: false,
  formatError: error => {
    console.error(error);
    return error;
  },
});

server.listen(PORT).then(({ url }) => {
  console.info(`💾 Server running at ${url}`);
});
