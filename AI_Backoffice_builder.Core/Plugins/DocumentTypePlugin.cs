using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;
using AI_Backoffice_builder.Core.Constants;
using AI_Backoffice_builder.Core.Services.Interfaces;
using AI_Backoffice_builder.Models.Dtos;
using Microsoft.SemanticKernel;

public class DocumentTypePlugin
{
    private readonly IBackOfficeAuthService _authService;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly Func<IDataTypeServiceGetter> _dataTypeServiceGetterFactory;

    public DocumentTypePlugin(
        IBackOfficeAuthService authService,
        IHttpClientFactory httpClientFactory,
        Func<IDataTypeServiceGetter> dataTypeServiceGetterFactory
    )
    {
        _authService = authService;
        _httpClientFactory = httpClientFactory;
        _dataTypeServiceGetterFactory = dataTypeServiceGetterFactory;
    }

    [KernelFunction("create_document_type")]
    [Description(
        @"Creates a document type for Umbraco backoffice with custom properties.
Property definitions should be provided as comma-separated pairs of name and type, like: ""Property Name:type"".
Available property types: textstring, textarea, richtexteditor, numeric
Example: ""Page Title:textstring,Main Content:richtexteditor,Summary:textarea,Order:numeric"""
    )]
    public async Task<string> CreateDocumentType(
        [Description("The name of the document type to create")] string name,
        [Description(
            "Comma-separated list of property definitions in format 'PropertyName:propertyType'"
        )]
            string propertyDefinitions = ""
    )
    {
        var token = await _authService.GetTokenAsync();
        var client = _httpClientFactory.CreateClient();

        // Convert name to camelCase alias
        var alias = string.Concat(
            name.Split(
                    new[] { ' ', '-', '_', '.', ':', '/', '\\' },
                    StringSplitOptions.RemoveEmptyEntries
                )
                .Select(
                    (word, index) =>
                        index == 0
                            ? word.ToLower()
                            : char.ToUpper(word[0]) + word.Substring(1).ToLower()
                )
        );

        var contentContainer = new ContainerDefinitionDto
        {
            Name = "Content",
            Type = "Tab",
            SortOrder = 0
        };
        var propertyList = new List<PropertyDto>();
        if (!string.IsNullOrEmpty(propertyDefinitions))
        {
            var propertyDefs = propertyDefinitions.Split(
                ',',
                StringSplitOptions.RemoveEmptyEntries
            );
            var sortOrder = 0;
            foreach (var propDef in propertyDefs)
            {
                // Expected format: "propertyName:propertyType"
                var parts = propDef.Trim().Split(':');
                if (parts.Length != 2)
                    continue;

                var propertyName = parts[0].Trim();
                var propertyType = parts[1].Trim().ToLower();

                var dataTypeId = await GetDataTypeId(propertyType);
                if (dataTypeId != Guid.Empty)
                {
                    var propertyAlias = string.Concat(
                        propertyName
                            .Split(
                                new[] { ' ', '-', '_', '.', ':', '/', '\\' },
                                StringSplitOptions.RemoveEmptyEntries
                            )
                            .Select(
                                (word, index) =>
                                    index == 0
                                        ? word.ToLower()
                                        : char.ToUpper(word[0]) + word.Substring(1).ToLower()
                            )
                    );

                    propertyList.Add(
                        new PropertyDto
                        {
                            Container = new ContainerDto { Id = contentContainer.Id },
                            SortOrder = sortOrder++,
                            Alias = propertyAlias,
                            Name = propertyName,
                            DataType = new DataTypeDto { Id = dataTypeId }
                        }
                    );
                }
            }
        }

        var request = new CreateDocumentTypeRequest
        {
            Alias = alias,
            Name = name,
            Icon = "icon-document",
            AllowedAsRoot = false,
            VariesByCulture = false,
            VariesBySegment = false,
            IsElement = false,
            Id = Guid.NewGuid(),
            Properties = propertyList,
            Containers = new List<ContainerDefinitionDto> { contentContainer }
        };

        var content = JsonSerializer.Serialize(request);
        var httpContent = new StringContent(content, System.Text.Encoding.UTF8, "application/json");

        client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        var response = await client.PostAsync(
            $"{ApiConstants.BaseUrl}/umbraco/management/api/v1/document-type",
            httpContent
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Failed to create document type: {error}");
        }

        return $"Document type {name} created successfully";
    }

    private async Task<Guid> GetDataTypeId(string propertyType)
    {
        var dataTypeService = _dataTypeServiceGetterFactory();
        return await dataTypeService.GetDataTypeUniqueIdByAlias(propertyType);
    }
}
