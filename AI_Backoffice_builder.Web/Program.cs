using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using OllamaSharp;
using AI_Backoffice_builder.Core.Services;
using Microsoft.SemanticKernel.Embeddings;
using DotEnv.Core;
using AI_Backoffice_builder.Core.Services.Interfaces;

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



//builder.Services.AddSingleton<IMemoryStore>(new VolatileMemoryStore());
//builder.Services.AddSingleton<ISemanticTextMemory>(sp => 
//{
//    var store = sp.GetRequiredService<IMemoryStore>();
//    var embedder = new OllamaApiClient(reader["OLLAMA_API_URL"], "chroma/all-minilm-l6-v2-f32")
//        .AsTextEmbeddingGenerationService();
//    return new SemanticTextMemory(store, embedder);
//});


//builder.Services.AddSingleton(sp =>
//{
//    var builder = Kernel.CreateBuilder();

//    builder.Services.AddSingleton<IBackOfficeAuthService>(sp.GetRequiredService<IBackOfficeAuthService>());
//    builder.Services.AddSingleton<IHttpClientFactory>(sp.GetRequiredService<IHttpClientFactory>());
//    builder.Plugins.AddFromType<LightsPlugin>();
//    builder.Plugins.AddFromType<DocumentTypePlugin>();
//    //builder.Services.AddOllamaChatCompletion("llama3-groq-tool-use:latest", new Uri(reader["OLLAMA_API_URL"]));
//    return builder.Build();
//});



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