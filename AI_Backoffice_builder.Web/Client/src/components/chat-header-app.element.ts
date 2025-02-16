import type { CSSResultGroup } from '@umbraco-cms/backoffice/external/lit';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbHeaderAppButtonElement } from '@umbraco-cms/backoffice/components';
import './chatbot-component';

const elementName = 'umb-chat-header-app';

@customElement(elementName)
export class UmbChatHeaderAppElement extends UmbHeaderAppButtonElement {
  @state()
  private _popoverOpen = false;

  #onPopoverToggle(event: any) {
    this._popoverOpen = event.newState === 'open';
    // Force update the chatbot component
    const chatbot = this.renderRoot.querySelector('chatbot-component');
    if (chatbot) {
      (chatbot as any).isOpen = this._popoverOpen;
    }
  }

  override render() {
    return html`
      <uui-button 
        id="chat-button"
        popovertarget="chat-menu-popover" 
        look="primary" 
        label="Chat" 
        compact>
        <uui-icon name="icon-chat"></uui-icon>
      </uui-button>

      <uui-popover-container 
        id="chat-menu-popover" 
        placement="bottom-end"
        @toggle=${this.#onPopoverToggle}>
        <umb-popover-layout>
          <uui-box>
            <chatbot-component .isOpen=${this._popoverOpen}></chatbot-component>
          </uui-box>
        </umb-popover-layout>
      </uui-popover-container>
    `;
  }

  static override styles: CSSResultGroup = [
    UmbHeaderAppButtonElement.styles,
    css`
      uui-popover-container {
        width: 350px;
      }

      umb-popover-layout {
        height: 600px;
        max-height: 90vh;
      }
      
      uui-box {
        height: 100%;
      }
      
      chatbot-component {
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
