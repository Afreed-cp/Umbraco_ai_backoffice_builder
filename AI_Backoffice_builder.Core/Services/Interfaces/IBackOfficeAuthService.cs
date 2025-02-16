namespace AI_Backoffice_builder.Core.Services.Interfaces;

public interface IBackOfficeAuthService
{
    Task<string> GetTokenAsync();
}
