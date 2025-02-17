using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AI_Backoffice_builder.Models.Dtos
{
    public class CreateDocumentTypeRequest
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
