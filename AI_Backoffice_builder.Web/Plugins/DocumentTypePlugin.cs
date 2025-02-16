using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SemanticKernel;
using AI_Backoffice_builder.Web.Services;

public class DocumentTypePlugin
{
    private readonly IBackOfficeAuthService _authService;
    private readonly IHttpClientFactory _httpClientFactory;

    public DocumentTypePlugin(IBackOfficeAuthService authService, IHttpClientFactory httpClientFactory)
    {
        _authService = authService;
        _httpClientFactory = httpClientFactory;
    }

    [KernelFunction("create_document_type")]
    [Description("Creates a document type for umbraco backoffice")]
    public async Task<string> CreateDocumentType(string name)
    {
        var token = await _authService.GetTokenAsync();
        var client = _httpClientFactory.CreateClient();
        
        // Convert name to camelCase alias
        var alias = string.Concat(
            name.Split(new[] { ' ', '-', '_', '.', ':', '/', '\\' }, StringSplitOptions.RemoveEmptyEntries)
                .Select((word, index) => index == 0 
                    ? word.ToLower() 
                    : char.ToUpper(word[0]) + word.Substring(1).ToLower())
        );
        
        var request = new CreateDocumentTypeRequest
        {
            Alias = alias,
            Name = name,
            Icon = "icon-document",
            AllowedAsRoot = false,
            VariesByCulture = false,
            VariesBySegment = false,
            IsElement = false,
            Id = Guid.NewGuid()
        };

        var content = JsonSerializer.Serialize(request);
        var httpContent = new StringContent(content, System.Text.Encoding.UTF8, "application/json");
        
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        
        var response = await client.PostAsync($"{Constants.Host}/umbraco/management/api/v1/document-type", httpContent);
        
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Failed to create document type: {error}");
        }

        return $"Document type {name} created successfully";
    }

    private class CreateDocumentTypeRequest
    {
        [JsonPropertyName("parent")]
        public object? Parent { get; set; } = null;

        [JsonPropertyName("alias")]
        public string Alias { get; set; } = string.Empty;

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("icon")]
        public string Icon { get; set; } = string.Empty;

        [JsonPropertyName("allowedAsRoot")]
        public bool AllowedAsRoot { get; set; }

        [JsonPropertyName("variesByCulture")]
        public bool VariesByCulture { get; set; }

        [JsonPropertyName("variesBySegment")]
        public bool VariesBySegment { get; set; }

        [JsonPropertyName("isElement")]
        public bool IsElement { get; set; }

        [JsonPropertyName("properties")]
        public object[] Properties { get; set; } = Array.Empty<object>();

        [JsonPropertyName("containers")]
        public object[] Containers { get; set; } = Array.Empty<object>();

        [JsonPropertyName("allowedDocumentTypes")]
        public object[] AllowedDocumentTypes { get; set; } = Array.Empty<object>();

        [JsonPropertyName("compositions")]
        public object[] Compositions { get; set; } = Array.Empty<object>();

        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("allowedTemplates")]
        public object[] AllowedTemplates { get; set; } = Array.Empty<object>();

        [JsonPropertyName("defaultTemplate")]
        public object? DefaultTemplate { get; set; } = null;

        [JsonPropertyName("cleanup")]
        public CleanupConfig Cleanup { get; set; } = new();

        [JsonPropertyName("collection")]
        public object? Collection { get; set; } = null;
    }

    private class CleanupConfig
    {
        [JsonPropertyName("preventCleanup")]
        public bool PreventCleanup { get; set; }

        [JsonPropertyName("keepAllVersionsNewerThanDays")]
        public object? KeepAllVersionsNewerThanDays { get; set; } = null;

        [JsonPropertyName("keepLatestVersionPerDayForDays")]
        public object? KeepLatestVersionPerDayForDays { get; set; } = null;
    }
}