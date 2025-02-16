using System.Text.Json;
using System.Text.Json.Serialization;
using AI_Backoffice_builder.Core.Constants;
using AI_Backoffice_builder.Core.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace AI_Backoffice_builder.Core.Services;

public class BackOfficeAuthService : IBackOfficeAuthService
{
    private string? _token;
    private DateTime? _tokenExpiryTime;
    private readonly IConfiguration _configuration;

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly object _lock = new();

    public BackOfficeAuthService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetTokenAsync()
    {
        if (_token != null && _tokenExpiryTime.HasValue && DateTime.UtcNow < _tokenExpiryTime.Value)
        {
            return _token;
        }

        lock (_lock)
        {
            if (_token != null && _tokenExpiryTime.HasValue && DateTime.UtcNow < _tokenExpiryTime.Value)
            {
                return _token;
            }
        }

        var formContent = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("client_id", "umbraco-back-office-testapiuser"),
            new KeyValuePair<string, string>("client_secret", "1234567890"),
            new KeyValuePair<string, string>("grant_type", "client_credentials")
        });

        using var client = _httpClientFactory.CreateClient();
        var response = await client.PostAsync(
            $"{ApiConstants.BaseUrl}/umbraco/management/api/v1/security/back-office/token",
            formContent);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Failed to obtain token");
        }

        var content = await response.Content.ReadAsStringAsync();
        var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(content);

        if (tokenResponse == null)
        {
            throw new Exception("Failed to parse token response");
        }

        _token = tokenResponse.AccessToken;
        _tokenExpiryTime = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn);

        return _token;
    }

    private class TokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = string.Empty;

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }
}
