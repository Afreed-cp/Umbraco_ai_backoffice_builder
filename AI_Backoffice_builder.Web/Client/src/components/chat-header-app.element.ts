import type { CSSResultGroup } from '@umbraco-cms/backoffice/external/lit';
import { css, html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbHeaderAppButtonElement } from '@umbraco-cms/backoffice/components';
import './chatbot-component';
import { render } from '@umbraco-cms/backoffice/external/lit';
const elementName = 'umb-chat-header-app';

@customElement(elementName)
export class UmbChatHeaderAppElement extends UmbHeaderAppButtonElement {
  
  #openChatSidebar() {
    const modalHtml = html`
      <uui-modal-sidebar size="small">
        <div class="sidebar-container">
          <uui-box headline="Umbraco BOT">
            <chatbot-component></chatbot-component>
          </uui-box>
        </div>
      </uui-modal-sidebar>
    `;

    const container = document.createElement('uui-modal-container');
    container.innerHTML = '';

    render(modalHtml, container);
    document.body.appendChild(container);
  }

  override render() {
    return html`
      <uui-button 
        look="primary" 
        label="Chat" 
        compact
        @click=${this.#openChatSidebar}>
        <uui-icon name="icon-chat"></uui-icon>
      </uui-button>
    `;
  }

  static override styles: CSSResultGroup = [
    UmbHeaderAppButtonElement.styles,
    css`
      .sidebar-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--uui-color-surface);
      }

      uui-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0;
        height: 100%;
      }
    `
  ];
}

export { UmbChatHeaderAppElement as element };

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: UmbChatHeaderAppElement;
  }
}
