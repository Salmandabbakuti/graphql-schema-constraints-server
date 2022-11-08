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
      # array should not contain more than 5 items
      arrayMax5: [1, 2, 3]
      # array should contain minimum of 3 items
      arrayMin3: [1, 2, 3]
      # string should be in email format i.e should contain @
      emailFormat: "sfdsfsd@gma.com"
      # value should be less than 10
      exclusiveMax10: 9
      # value should be greater than 3
      exclusiveMin3: 4
      # value should be between 3 and 10
      minMaxInt3_10: 4
      # string length should be between 3 and 10
      minMaxString3_10: "hello this is long string that is not acceptable"
      # value must be multiples of 3. i.e 3, 6, 9, 12, 15
      multipleOf3: 9
      # value should match pattern "^[0-9a-zA-Z_-]+$"
      pattern: "salmn_279"
      # string should contain "foo"
      stringContainsFoo: "foo"
      # string should not contains "foo"
      stringNotContainsFoo: "bar"
      # string should starts with "foo"
      stringStartsWithFoo: "foo"
      # string should end with "foo"
      stringEndsWithFoo: "foo"
    }
  )
}
```
