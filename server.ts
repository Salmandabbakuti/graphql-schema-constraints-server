import { createServer } from '@graphql-yoga/node';
import { createEnvelopQueryValidationPlugin, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs =
  `
  scalar Json
  type Query {
    hello: String
  }
  type Mutation {
    hello: String
    createBook(data: BookInput!): Json
  }
  input BookInput {
    # value must be at least 3 characters long and at most 10 characters long
    minMaxString3_10: String! @constraint(minLength: 3, maxLength: 10)

    # value must match the regular expression
    pattern: String! @constraint(pattern: "^[0-9a-zA-Z_-]+$")

    # value must be email format
    emailFormat: String! @constraint(minLength: 5, format: "email")

    # value must be  between 3 and 10
    minMaxInt3_10: Int! @constraint(min: 3, max: 10)

    # string should contain "foo" in it
    stringContainsFoo: String! @constraint(contains: "foo")

    # string should not contain "foo" in it
    stringNotContainsFoo: String! @constraint(notContains: "foo")

    # string should start with "foo"
    stringStartsWithFoo: String! @constraint(startsWith: "foo")

    # string should end with "foo"
    stringEndsWithFoo: String! @constraint(endsWith: "foo")

    # value must be greater than 3
    exclusiveMin3: Int! @constraint(exclusiveMin: 3)

    # value must be less than 10
    exclusiveMax10: Int! @constraint(exclusiveMax: 10)

    # value must be multiples of 3 (3, 6, 9, 12, ...)
    multipleOf3: Int! @constraint(multipleOf: 3)

    # array must contain at least 3 items
    arrayMin3: [Int!]! @constraint(minItems: 3)

    # array must contain at most 10 items
    arrayMax5: [Int!]! @constraint(maxItems: 5)
  }
  `;

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL!',

  },
  Mutation: {
    hello: () => 'Hello GraphQL!',
    createBook: (parent: any, args: any) => args.data,
  }
};

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers
});

const server = createServer({
  schema,
  plugins: [createEnvelopQueryValidationPlugin()]
});

server.start();;