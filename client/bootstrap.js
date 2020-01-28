import { store } from '@things-factory/shell'
import idRuleBase from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    idRuleBase
  })
}
