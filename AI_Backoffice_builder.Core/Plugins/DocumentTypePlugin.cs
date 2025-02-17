using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SemanticKernel;
using AI_Backoffice_builder.Core.Constants;
using AI_Backoffice_builder.Core.Services.Interfaces;
using AI_Backoffice_builder.Models.Dtos;

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
        
        var response = await client.PostAsync($"{ApiConstants.BaseUrl}/umbraco/management/api/v1/document-type", httpContent);
        
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Failed to create document type: {error}");
        }

        return $"Document type {name} created successfully";
    }

}