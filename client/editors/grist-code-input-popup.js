import '@material/mwc-button'
import { i18next } from '@things-factory/i18n-base'
import { client, gqlBuilder } from '@things-factory/shell'
import gql from 'graphql-tag'
import { css, html, LitElement } from 'lit-element'
import './editor-code'

const FETCH_ID_RULE_GQL = type => {
  return gql`
  {
    idRule(type:"${type}") {
      id,
      type,
      rule
    }
  }
`
}

export class GristCodeInputPopup extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 0;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        border: 0;
        background-color: var(--popup-content-background-color);

        font: var(--grist-object-editor-font);
        color: var(--grist-object-editor-color);

        justify-content: inherit;
      }

      :host * {
        box-sizing: border-box;
      }

      #wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 5px;
      }

      #wrapper > h4 {
        margin: 0;
      }

      #wrapper > ul {
        width: 100%;
      }

      #wrapper > ul > li {
        display: flex;
      }
      #wrapper > ul > li > span {
        font-weight: bold;
        flex-basis: 200px;
      }

      #wrapper > ul > li > i18n-msg {
        flex: 1;
      }

      editor-code {
        width: 100%;
        flex: 1;
      }

      #footer {
        display: flex;
        justify-content: flex-end;
      }
    `
  }

  static get properties() {
    return {
      value: String,
      column: Object,
      record: Object,
      row: Number,
      field: Object,
      _idRule: Object
    }
  }
  render() {
    return html`
      <div id="wrapper">
        <h4><i18n-msg msgid="label.arguments"></i18n-msg></h4>
        <ul>
          <li><span>domain</span><i18n-msg msgid="label.argument domain description"></i18n-msg></li>
          <li><span>seed</span><i18n-msg msgid="label.argument seed description"></i18n-msg></li>
        </ul>
        <editor-code id="rule-editor" type="text" .value=${(this._idRule || {}).rule}></editor-code>
        <div id="footer">
          <mwc-button
            label=${i18next.t('button.save')}
            @click=${e => {
              this.updateIdRule()
            }}
          ></mwc-button>
        </div>
      </div>
    `
  }

  updated(changed) {
    if (changed.has('value')) {
      if (this.value && typeof this.value === 'string') {
        this.getRule(this.value)
      }
    }
  }

  async getRule() {
    var response = await client.query({
      query: FETCH_ID_RULE_GQL(this.value)
    })

    let idRule = response.data.idRule
    if (!idRule) {
      idRule = await this.createIdRule()
    }

    this._idRule = idRule
    this.requestUpdate()
  }

  async createIdRule() {
    var newRule = {
      type: this.value,
      rule: `return ''`
    }
    return await client.query({
      query: gql`
          mutation {
            createIdRule(${gqlBuilder.buildArgs({ idRule: newRule })}) {
              type,
              rule
            }
          }
        `
    })
  }

  async updateIdRule() {
    if (!this._idRule) console.error('ID Rule not found')

    const editor = this.renderRoot.querySelector('#rule-editor')
    const rule = editor.value

    const type = this._idRule.type

    const patchRule = {
      ...this.idRule,
      rule
    }

    await client.query({
      query: gql`
          mutation {
            updateIdRule(${gqlBuilder.buildArgs({ type, patch: patchRule })}) {
              type,
              rule
            }
          }
        `
    })

    this.dispatchEvent(
      new CustomEvent('close-popup', {
        bubbles: true,
        composed: true
      })
    )
  }
}
customElements.define('grist-code-input-popup', GristCodeInputPopup)
