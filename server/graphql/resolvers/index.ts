import { idRuleResolver } from './id-rule'
import { createIdRule } from './create-id-rule'
import { updateIdRule } from './update-id-rule'

export const queries = [idRuleResolver]

export const mutations = [createIdRule, updateIdRule]
