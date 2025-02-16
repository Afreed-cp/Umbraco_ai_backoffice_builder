using AI_Backoffice_builder.Core.Models;
using Microsoft.SemanticKernel.ChatCompletion;

namespace AI_Backoffice_builder.Core.Services.Interfaces;

public interface IChatHistoryManager
{
    void AddUserMessage(string message);
    void AddAssistantMessage(string message);
    void Clear();
    ChatHistory GetSemanticKernelHistory();
    IReadOnlyList<ChatMessage> GetPersistentHistory();
}
