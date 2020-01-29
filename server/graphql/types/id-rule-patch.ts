import gql from 'graphql-tag'

export const IdRulePatch = gql`
  input IdRulePatch {
    type: String
    rule: String
  }
`
