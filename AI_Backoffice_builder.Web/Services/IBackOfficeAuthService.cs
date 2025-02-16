namespace AI_Backoffice_builder.Web.Services;

public interface IBackOfficeAuthService
{
    Task<string> GetTokenAsync();
}
