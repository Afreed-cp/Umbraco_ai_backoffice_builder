import { css } from 'lit';

export const chatbotStyles = css`
  .chatbot-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid #ccc;
  }

  .chatbot-header {
    background: #f0f0f0;
    padding: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .chatbot-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background: #fafafa;
  }

  .chat-message {
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 5px;
  }

  .user-message {
    background-color: #d1e7fd;
    text-align: right;
  }

  .bot-message {
    background-color: #e0e0e0;
  }

  .chatbot-footer {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  .chatbot-footer input {
    flex: 1;
    padding: 5px;
    margin-right: 5px;
  }
`;
