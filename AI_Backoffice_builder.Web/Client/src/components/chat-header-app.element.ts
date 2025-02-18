import { html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbHeaderAppButtonElement } from '@umbraco-cms/backoffice/components';
import './chatbot-component';
import { render } from '@umbraco-cms/backoffice/external/lit';
const elementName = 'umb-chat-header-app';

@customElement(elementName)
export class UmbChatHeaderAppElement extends UmbHeaderAppButtonElement {
  
  #openChatSidebar() {
    const modalHtml = html`
      <uui-modal-sidebar size="small" @click=${(e: MouseEvent) => e.stopPropagation()}>
        <div class="sidebar-container">
          <uui-box headline="Umbraco BOT">
           <div style="margin-top: -8px; cursor: pointer;" slot="header-actions"> 
           <uui-icon-registry-essential>
            <uui-icon style="color: red;" name="not_existing" @click=${(e: MouseEvent) => {
              const modal = (e.target as HTMLElement).closest('uui-modal-sidebar');
              modal?.parentElement?.remove();
            }}> <svg xmlns="http://www.w3.org/2000/svg" slot="fallback" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </uui-icon>
            </uui-icon-registry-essential></div>
            <chatbot-component></chatbot-component>
          </uui-box>
        </div>
      </uui-modal-sidebar>
    `;

    const container = document.createElement('uui-modal-container');
    container.innerHTML = '';
    
    // Add click outside handler
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        container.remove();
      }
    });

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
}

export { UmbChatHeaderAppElement as element };

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: UmbChatHeaderAppElement;
  }
}
