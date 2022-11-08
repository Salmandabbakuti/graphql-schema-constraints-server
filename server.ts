import { createServer } from '@graphql-yoga/node';
import { useLiveQuery } from "@envelop/live-query";
import { InMemoryLiveQueryStore } from "@n1ru4l/in-memory-live-query-store";
import { GraphQLLiveDirective } from "@n1ru4l/graphql-live-query";
import { astFromDirective } from "@graphql-tools/utils";

const liveQueryStore = new InMemoryLiveQueryStore();

const users = [
  { id: 1, name: 'John', age: 26 },
  { id: 2, name: 'Jane', age: 34 },
  { id: 3, name: 'Bob', age: 42 }
];

const typeDefs = [
  `
  scalar Json
  type Query {
    hello: String
    getUsers: [User!]!
    getUser(id: Int!): User
  }
  type Mutation {
    updateUser(id: Int!, name: String!, age: Int): Json
  }
  type User {
    id: ID!
    name: String
    age: Int
  }
  `,
  astFromDirective(GraphQLLiveDirective)
];

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL!',
    getUsers: () => users,
    getUser: (_parent: any, args: { id: number; }) => users.find(user => user.id === args.id)
  },
  Mutation: {
    updateUser: (_parent: any, args: { id: number; name: string; age: number; }) => {
      const { id, name, age } = args;
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex >= 0) {
        users[userIndex] = { id, name, age };
      }
      liveQueryStore.invalidate(['Query.getUsers', `User:${id}`]);
      return users[userIndex];
    }
  }
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  },
  plugins: [useLiveQuery({ liveQueryStore })]
});

server.start();