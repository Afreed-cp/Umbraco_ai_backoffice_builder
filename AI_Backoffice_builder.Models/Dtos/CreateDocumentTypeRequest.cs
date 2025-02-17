using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AI_Backoffice_builder.Models.Dtos
{
    public class CreateDocumentTypeRequest
    {
        [JsonPropertyName("parent")]
        public object? Parent { get; set; } = null;

        [JsonPropertyName("alias")]
        public string Alias { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("icon")]
        public string Icon { get; set; }

        [JsonPropertyName("allowedAsRoot")]
        public bool AllowedAsRoot { get; set; }

        [JsonPropertyName("variesByCulture")]
        public bool VariesByCulture { get; set; }

        [JsonPropertyName("variesBySegment")]
        public bool VariesBySegment { get; set; }

        [JsonPropertyName("isElement")]
        public bool IsElement { get; set; }

        [JsonPropertyName("properties")]
        public List<PropertyDto> Properties { get; set; } = new();

        [JsonPropertyName("containers")]
        public List<ContainerDefinitionDto> Containers { get; set; } = new();

        [JsonPropertyName("allowedDocumentTypes")]
        public List<string> AllowedDocumentTypes { get; set; } = new();

        [JsonPropertyName("compositions")]
        public List<string> Compositions { get; set; } = new();

        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("allowedTemplates")]
        public List<string> AllowedTemplates { get; set; } = new();

        [JsonPropertyName("defaultTemplate")]
        public object? DefaultTemplate { get; set; } = null;

        [JsonPropertyName("cleanup")]
        public CleanupConfig Cleanup { get; set; } = new();

        [JsonPropertyName("collection")]
        public object? Collection { get; set; } = null;
    }

    public class ContainerDefinitionDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [JsonPropertyName("parent")]
        public object Parent { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("sortOrder")]
        public int SortOrder { get; set; }
    }

    public class CleanupConfig
    {
        [JsonPropertyName("preventCleanup")]
        public bool PreventCleanup { get; set; }

        [JsonPropertyName("keepAllVersionsNewerThanDays")]
        public object? KeepAllVersionsNewerThanDays { get; set; } = null;

        [JsonPropertyName("keepLatestVersionPerDayForDays")]
        public object? KeepLatestVersionPerDayForDays { get; set; } = null;
    }
}
