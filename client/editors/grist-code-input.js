import '@material/mwc-button'
import { InputEditor } from '@things-factory/grist-ui'
import { i18next } from '@things-factory/i18n-base'
import { css, html } from 'lit-element'
import './grist-code-input-popup'
import './id-rule-renderer'

export class GristCodeInput extends InputEditor {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        padding: 7px 0px;
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        border: 0;
        background-color: transparent;

        font: var(--grist-object-editor-font);
        color: var(--grist-object-editor-color);

        justify-content: inherit;
      }

      id-rule-renderer {
        display: flex;
        flex: auto;

        justify-content: inherit;
      }

      mwc-icon {
        width: 20px;
        font-size: 1.5em;
      }

      #popup {
        display: flex;
        overflow: hidden;
      }
    `
  }

  static get properties() {
    return {
      ...InputEditor.properties,
      popup: Object
    }
  }

  render() {
    return html`
      <text-input
        .value=${this.value}
        .record=${this.record}
        .column=${this.column}
        .field=${this.column}
        .row=${this.row}
      ></text-input>
      <mwc-icon id="more" @click=${e => this.openPopup()}>more_vert</mwc-icon>
    `
  }

  async firstUpdated() {
    await this.updateComplete
    await super.firstUpdated()
  }

  openPopup() {
    if (this.record.__dirty__) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          bubbles: true,
          composed: true,
          detail: {
            level: 'error',
            message: i18next.t('text.please save your modifications first.')
          }
        })
      )

      return
    }

    document.dispatchEvent(
      new CustomEvent('open-popup', {
        bubbles: true,
        composed: true,
        detail: {
          template: html`
            <grist-code-input-popup
              .value=${this.value}
              .column=${this.column}
              .record=${this.record}
              .row=${this.row}
              .field=${this.field}
              @close-popup=${e => {
                this.popup.close()
                this.popup = null
              }}
            ></grist-code-input-popup>
          `,
          options: {
            title: i18next.t('title.ID Rule Editor')
          },
          callback: popup => {
            this.popup = popup
          }
        }
      })
    )
  }
}
customElements.define('grist-code-input', GristCodeInput)
