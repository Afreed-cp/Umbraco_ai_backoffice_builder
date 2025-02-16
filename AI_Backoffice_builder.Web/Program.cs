using IdentityModel.Client;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using OllamaSharp;
using AI_Backoffice_builder.Web.Services;
using Microsoft.SemanticKernel.Embeddings;
using Microsoft.SemanticKernel.ChatCompletion;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddDeliveryApi()
    .AddWebsite()
    .AddComposers()
    .Build();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
    });
#pragma warning disable SKEXP0001, SKEXP0010, SKEXP0020, SKEXP0050, SKEXP0070 

builder.Services.AddSingleton<IMemoryStore>(new VolatileMemoryStore());
builder.Services.AddSingleton<ISemanticTextMemory>(sp => 
{
    var store = sp.GetRequiredService<IMemoryStore>();
    var embedder = new OllamaApiClient("", "chroma/all-minilm-l6-v2-f32")
        .AsTextEmbeddingGenerationService();
    return new SemanticTextMemory(store, embedder);
});
builder.Services.AddHttpClient();
builder.Services.AddSingleton<IBackOfficeAuthService, BackOfficeAuthService>();

builder.Services.AddSingleton(sp =>
{
    var builder = Kernel.CreateBuilder();

    builder.Services.AddSingleton<IBackOfficeAuthService>(sp.GetRequiredService<IBackOfficeAuthService>());
    builder.Plugins.AddFromType<LightsPlugin>();
    builder.Plugins.AddFromType<DocumentTypePlugin>();
    builder.Services.AddOllamaChatCompletion("llama3-groq-tool-use:latest", new Uri(""));
    return builder.Build();
});

builder.Services.AddSingleton<SemanticKernelService>();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();
app.UseCors();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

await app.RunAsync();