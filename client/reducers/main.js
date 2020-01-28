import { UPDATE_ID_RULE_BASE } from '../actions/main'

const INITIAL_STATE = {
  idRuleBase: 'ABC'
}

const idRuleBase = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ID_RULE_BASE:
      return { ...state }

    default:
      return state
  }
}

export default idRuleBase
