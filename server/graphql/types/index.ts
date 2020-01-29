import { Filter, Pagination, Sorting, ObjectRef } from '@things-factory/shell'
import { IdRule } from './id-rule'
import { IdRulePatch } from './id-rule-patch'
import { NewIdRule } from './new-id-rule'
// import * as CommonCodeDetail from './common-code-detail'

// export const queries = [
//   CommonCode.Query,
//   CommonCodeDetail.Query
// ]

// export const mutations = [
//   CommonCode.Mutation,
//   CommonCodeDetail.Mutation
// ]

// export const types = [
//   ...CommonCode.Types,
//   ...CommonCodeDetail.Types
// ]

export const queries = [`idRule(type: String!): IdRule`]

export const mutations = [
  `
  createIdRule (
    idRule: NewIdRule!
  ): IdRule

  updateIdRule (
    type: String!
    patch: IdRulePatch
  ): IdRule
  `
]

export const types = [Filter, Pagination, Sorting, ObjectRef, IdRule, IdRulePatch, NewIdRule]
