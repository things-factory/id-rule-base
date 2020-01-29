import gql from 'graphql-tag'

export const IdRule = gql`
  type IdRule {
    id: String
    type: String
    rule: String
    createdAt: String
    updatedAt: String
  }
`
