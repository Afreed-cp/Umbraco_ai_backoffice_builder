import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Message {
  sender: string;
  text: string;
}

@customElement('chatbot-component')
export class ChatbotComponent extends LitElement {
  @state()
  private messages: Message[] = [
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ];

  @state()
  private userInput: string = '';

  private _chatBody?: HTMLElement;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0; /* Important for nested flex containers */
    }

    .chatbot-container {
      display: flex;
      flex-direction: column;
      min-height:91vh;
      flex-wrap: wrap;
      align-content: space-between;    
    }

    .chatbot-body {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 1rem;
      background: var(--uui-color-surface);
      min-height: 0; /* Important for nested flex containers */
    }

    .chat-message {
      padding: 8px;
      margin-bottom: 5px;
      border-radius: 5px;
      word-break: break-word;
    }

    .user-message {
      background-color: var(--uui-color-positive-alt);
      text-align: right;
    }

    .bot-message {
      background-color: var(--uui-color-surface-alt);
    }

    .chatbot-footer {
      flex: 0 0 auto;
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--uui-color-divider);
      background: var(--uui-color-surface);
      position: sticky;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }

    uui-input {
      flex: 1;
    }
  `;

  firstUpdated() {
    this._chatBody = this.shadowRoot?.querySelector('.chatbot-body') as HTMLElement;
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages')) {
      this._scrollToBottom();
    }
  }

  render() {
    return html`
      <div class="chatbot-container">
        <div class="chatbot-body">
          ${this.messages.map(
            msg => html`
              <div class="chat-message ${msg.sender}-message">
                ${msg.text}
              </div>
            `
          )}
        </div>
        <div class="chatbot-footer">
          <uui-input
            type="text"
            .value=${this.userInput}
            @input=${this._handleInput}
            @keypress=${this._handleKeyPress}
            placeholder="Type a message..."
          ></uui-input>
          <uui-button 
            look="primary" 
            label="Send"
            @click=${this._sendMessage}
          >Send</uui-button>
        </div>
      </div>
    `;
  }

  private _handleInput(e: InputEvent) {
    this.userInput = (e.target as HTMLInputElement).value;
  }

  private _handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._sendMessage();
    }
  }

  private async _sendMessage() {
    if (this.userInput.trim()) {
        this.messages = [...this.messages, { sender: 'user', text: this.userInput }];
        debugger
        try {
            const response = await fetch('/api/chatapi/send', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message : this.userInput })
          });

            const data = await response.json();
            this.messages = [...this.messages, { sender: 'bot', text: data.response }];
        } catch (error) {
            console.error('Error:', error);
            this.messages = [...this.messages, 
                { sender: 'bot', text: 'Sorry, there was an error processing your request.' }
            ];
        }
        
        this.userInput = '';
    }
  }

  private _scrollToBottom() {
    if (this._chatBody) {
      this._chatBody.scrollTop = this._chatBody.scrollHeight;
    }
  }
}
