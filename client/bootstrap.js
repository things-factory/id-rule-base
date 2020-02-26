import { registerEditor, registerRenderer } from '@things-factory/grist-ui'
import { GristCodeInput } from './editors/grist-code-input'
import { IdRuleRenderer } from './editors/id-rule-renderer'

export default function bootstrap() {
  registerEditor('id-rule', GristCodeInput)
  registerRenderer('id-rule', IdRuleRenderer)
}
