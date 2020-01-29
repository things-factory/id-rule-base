import gql from 'graphql-tag'

export const NewIdRule = gql`
  input NewIdRule {
    type: String
    rule: String
  }
`
