using AI_Backoffice_builder.Core.Models;
using AI_Backoffice_builder.Core.Services.Interfaces;
using Microsoft.SemanticKernel.ChatCompletion;

namespace AI_Backoffice_builder.Core.Services;

public class ChatHistoryManager : IChatHistoryManager
{
    private readonly ChatHistory _history;
    private readonly List<ChatMessage> _persistentHistory;
    private readonly int _maxHistorySize;

    public ChatHistoryManager(int maxHistorySize = 100)
    {
        _history = new ChatHistory();
        _persistentHistory = new List<ChatMessage>();
        _maxHistorySize = maxHistorySize;
        
        // Add system message
        AddSystemMessage("""
            You are a chat bot for the open-source Umbraco CMS called Umbraco Copilot. 
            You can perform tasks and answer questions about entities within the CMS. 
            You can generate placeholder text based on existing content within the CMS. 
            You must not generate content or answer questions based on general knowledge.
            """);
    }

    public void AddUserMessage(string message)
    {
        _history.AddUserMessage(message);
        _persistentHistory.Add(new ChatMessage("user", message));
        TrimHistory();
    }

    public void AddAssistantMessage(string message)
    {
        _history.AddAssistantMessage(message);
        _persistentHistory.Add(new ChatMessage("assistant", message));
        TrimHistory();
    }

    private void AddSystemMessage(string message)
    {
        _history.AddSystemMessage(message);
        _persistentHistory.Add(new ChatMessage("system", message));
    }

    public void Clear()
    {
        _history.Clear();
        _persistentHistory.Clear();
        // Re-add system message after clearing
        AddSystemMessage("""
            You are a chat bot for the open-source Umbraco CMS called Umbraco Copilot. 
            You can perform tasks and answer questions about entities within the CMS. 
            You can generate placeholder text based on existing content within the CMS. 
            You must not generate content or answer questions based on general knowledge.
            """);
    }

    private void TrimHistory()
    {
        if (_persistentHistory.Count > _maxHistorySize)
        {
            // Remove oldest messages but keep system message
            var systemMessage = _persistentHistory.First();
            _persistentHistory.RemoveRange(1, _persistentHistory.Count - _maxHistorySize);
            _persistentHistory.Insert(0, systemMessage);
            
            // Rebuild SK chat history
            _history.Clear();
            foreach (var msg in _persistentHistory)
            {
                switch (msg.Role)
                {
                    case "system": _history.AddSystemMessage(msg.Content); break;
                    case "user": _history.AddUserMessage(msg.Content); break;
                    case "assistant": _history.AddAssistantMessage(msg.Content); break;
                }
            }
        }
    }

    public ChatHistory GetSemanticKernelHistory() => _history;
    
    public IReadOnlyList<ChatMessage> GetPersistentHistory() => _persistentHistory.AsReadOnly();
}
