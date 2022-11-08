# graphql-yoga-constraint-directives

Graphql Yoga constraint directives

```
yarn install

yarn dev
```

##### Sample Queries

```graphql
mutation createBook {
  createBook(
    data: {
      arrayMax5: [1, 2, 3]
      arrayMin3: [1, 2, 3]
      emailFormat: "sfdsfsd@gma.com"
      exclusiveMax10: 9
      exclusiveMin3: 4
      minMaxInt3_10: 4
      minMaxString3_10: "hello this is long string that is not acceptable"
      multipleOf3: 9
      pattern: "salmn_279"
      stringContainsFoo: "foo"
      stringEndsWithFoo: "foo"
      stringNotContainsFoo: "bar"
      stringStartsWithFoo: "foo"
    }
  )
}
```
