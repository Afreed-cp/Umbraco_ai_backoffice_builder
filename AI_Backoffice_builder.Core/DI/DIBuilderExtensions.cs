using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AI_Backoffice_builder.Core.Filters;
using AI_Backoffice_builder.Core.Plugins;
using AI_Backoffice_builder.Core.Services;
using AI_Backoffice_builder.Core.Services.Interfaces;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using DotEnv.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Ollama;
using Microsoft.SemanticKernel.Embeddings;
using Microsoft.SemanticKernel.Memory;
using NPoco;
using OllamaSharp;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Services;

namespace AI_Backoffice_builder.Core.DI
{
    public static class DIBuilderExtensions
    {
        public static IUmbracoBuilder RegisterCustomServices(this IUmbracoBuilder builder)
        {
            builder.Services.AddScoped<IDatabase>(sp =>
            {
                var connection = new System.Data.SQLite.SQLiteConnection(
                    "Data Source=|DataDirectory|/Umbraco.sqlite.db"
                );
                var db = new Database(connection, DatabaseType.SQLite);
                return db;
            });
            builder.Services.AddScoped<IDataTypeServiceGetter, DataTypeService>();

            new EnvLoader().Load();
            var reader = new EnvReader();
            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<IBackOfficeAuthService, BackOfficeAuthService>();
            builder.Services.AddTransient<IPlanProvider, PlanProvider>();
            builder.Services.AddSingleton<IMemoryStore>(new VolatileMemoryStore());

            #region Embedding
            builder.Services.AddSingleton<ISemanticTextMemory>(sp =>
            {
                var store = sp.GetRequiredService<IMemoryStore>();
                var embedder = new OllamaApiClient(
                    reader["OLLAMA_API_URL"],
                    "chroma/all-minilm-l6-v2-f32"
                ).AsTextEmbeddingGenerationService();
                return new SemanticTextMemory(store, embedder);
            });
            #endregion
            //builder.Services.AddSingleton<IChatHistoryManager, ChatHistoryManager>();

            #region ChatCompletionWithOllama
            builder.Services.AddSingleton(sp =>
            {
                var scopeFactory = sp.GetRequiredService<IServiceScopeFactory>();
                var builder = Kernel.CreateBuilder();

                builder.Services.AddSingleton<IBackOfficeAuthService>(
                    sp.GetRequiredService<IBackOfficeAuthService>()
                );
                builder.Services.AddSingleton<IHttpClientFactory>(
                    sp.GetRequiredService<IHttpClientFactory>()
                );
                builder.Services.AddSingleton<IContentService>(
                    sp.GetRequiredService<IContentService>()
                );
                builder.Services.AddSingleton<IPlanProvider>(
                   sp.GetRequiredService<IPlanProvider>()
               );
                builder.Services.AddSingleton<
                    IFunctionInvocationFilter,
                    UmbracoEntityResultFilter
                >();
                builder.Services.AddSingleton<Func<IDataTypeServiceGetter>>(() =>
                {
                    // Create a new scope each time you need to resolve the service.
                    using var scope = scopeFactory.CreateScope();
                    return scope.ServiceProvider.GetRequiredService<IDataTypeServiceGetter>();
                });

                //plugins
                builder.Plugins.AddFromType<LightsPlugin>();
                builder.Plugins.AddFromType<DocumentTypePlugin>();
                builder.Plugins.AddFromType<ContentPlugin>();
                builder.Plugins.AddFromType<PagePlugin>();
                builder.Plugins.AddFromType<WeatherPlugin>();
                builder.Plugins.AddFromType<TimePlugin>();

                builder.Services.AddOllamaChatCompletion(
                    "llama3-groq-tool-use:latest",
                    new Uri(reader["OLLAMA_API_URL"])
                );
                return builder.Build();
            });

            builder.Services.AddSingleton<SemanticKernelService>();
            #endregion

            return builder;
        }

        public static IUmbracoBuilder AddCustomServices(this IUmbracoBuilder builder)
        {
            builder.RegisterCustomServices();
            return builder;
        }
    }
}
