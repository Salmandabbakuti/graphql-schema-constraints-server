# graphql-yoga-live-queries

Graphql Yoga live queries

```
yarn install

yarn dev
```

##### Sample Queries

> try running `getUsers` and then call `updateUser` query in different tabs and see the live updates

```graphql
query getUsers @live {
  getUsers {
    id
    name
    age
  }
}

query getUser @live {
  getUser(id: 1) {
    id
    name
    age
  }
}

mutation updateUser {
  updateUser(id: 1, name: "Jason", age: 49)
}
```
