using AI_Backoffice_builder.Core.Filters;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Memory;
using OllamaSharp;

namespace AI_Backoffice_builder.Core.Services;
#pragma warning disable SKEXP0001, SKEXP0010, SKEXP0020, SKEXP0050, SKEXP0070 
public class SemanticKernelService
{
    private readonly ISemanticTextMemory _memory;
    private readonly Kernel _kernel;
    private readonly ChatHistory _chatHistory;

    public SemanticKernelService(ISemanticTextMemory memory, Kernel kernel)
    {
        _memory = memory;
        _kernel = kernel;
        _chatHistory = new ChatHistory();
        _kernel.FunctionInvocationFilters.Add(new UmbracoEntityResultFilter());
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
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
        };

        var chatCompletionService = _kernel.GetRequiredService<IChatCompletionService>();
        var result = await chatCompletionService.GetChatMessageContentsAsync(
            _chatHistory,
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