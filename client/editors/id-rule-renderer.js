import '@material/mwc-icon'
import { css, html, LitElement } from 'lit-element'

class IdRuleRendererElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;

        max-width: var(--board-renderer-max-width);
        border: var(--board-renderer-border);
      }
      span {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-indent: 5px;
        color: #fff;

        font: var(--board-renderer-name-font);
        background-color: var(--board-renderer-name-background-color);
      }
      img {
        width: 100%;
        max-height: 80px;
      }
      mwc-icon {
        position: absolute;
        top: 0;
        text-align: center;
        color: #fff;

        width: var(--board-renderer-icon-size);
        height: var(--board-renderer-icon-size);
        font: var(--board-renderer-font);
      }
      mwc-icon[edit] {
        right: 0;

        border-bottom-left-radius: var(--board-renderer-icon-border-radius);
        background-color: var(--board-renderer-icon-edit-background-color);
      }
      mwc-icon[view] {
        left: 0;

        border-bottom-right-radius: var(--board-renderer-icon-border-radius);
        background-color: var(--board-renderer-icon-view-background-color);
      }
    `
  }

  static get properties() {
    return {
      value: Object,
      _value: Object
    }
  }

  render() {
    return html`
      ${this.value}
    `
  }
}

customElements.define('id-rule-renderer', IdRuleRendererElement)

export const IdRuleRenderer = (value, column, record) => {
  return html`
    <id-rule-renderer .value=${value}></id-rule-renderer>
  `
}
