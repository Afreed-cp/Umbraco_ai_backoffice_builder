using AI_Backoffice_builder.Core.Services.Interfaces;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Memory;
using OllamaSharp;

namespace AI_Backoffice_builder.Core.Services;

public class SemanticKernelService : ISemanticKernelService
{
    private readonly ISemanticTextMemory _memory;
    private readonly Kernel _kernel;
    private readonly IChatHistoryManager _chatHistory;
    
    public SemanticKernelService(ISemanticTextMemory memory, Kernel kernel, IChatHistoryManager chatHistory)
    {
        _memory = memory;
        _kernel = kernel;
        _chatHistory = chatHistory;
    }

    public async Task SaveInformation(string collection, string text, string id, string description)
    {
        await _memory.SaveInformationAsync(
            collection: collection,
            text: text,
            id: id,
            description: description
        );
    }

    public async Task<string> SearchMemory(string collection, string query, int limit = 1)
    {
        var results = await _memory.SearchAsync(collection, query, limit: limit).ToListAsync();
        return string.Join("\n", results.Select(r => r.Metadata.Text));
    }

    public async Task<string> ChatAsync(string userMessage)
    {
        _chatHistory.AddUserMessage(userMessage);
         OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new()
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
            };
        var chatCompletionService = _kernel.GetRequiredService<IChatCompletionService>();
        var result = await chatCompletionService.GetChatMessageContentsAsync(
            _chatHistory.GetSemanticKernelHistory(),
            executionSettings: openAIPromptExecutionSettings,
            kernel: _kernel);

        var response = result.FirstOrDefault()?.Content ?? "No response generated.";
        _chatHistory.AddAssistantMessage(response);
        
        return response;
    }

    public void ClearHistory()
    {
        _chatHistory.Clear();
    }
}
