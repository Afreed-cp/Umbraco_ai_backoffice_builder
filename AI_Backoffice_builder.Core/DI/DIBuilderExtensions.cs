using AI_Backoffice_builder.Core.Services;
using AI_Backoffice_builder.Core.Services.Interfaces;
using DotEnv.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Ollama;
using Microsoft.SemanticKernel.Embeddings;
using Microsoft.SemanticKernel.Memory;
using OllamaSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Services;


namespace AI_Backoffice_builder.Core.DI
{
    public static class DIBuilderExtensions
    {
        public static IUmbracoBuilder RegisterCustomServices(this IUmbracoBuilder builder)
        {
            new EnvLoader().Load();
            var reader = new EnvReader();
            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<IBackOfficeAuthService, BackOfficeAuthService>();
            builder.Services.AddSingleton<ISemanticKernelService,SemanticKernelService>();
            builder.Services.AddSingleton<IChatHistoryManager, ChatHistoryManager>();

            builder.Services.AddSingleton<IChatCompletionService>(services =>
            {
                return new OllamaApiClient(reader["OLLAMA_API_URL"], "llama3-groq-tool-use:latest").AsChatCompletionService();
            });


            builder.Services.AddSingleton<IMemoryStore>(new VolatileMemoryStore());
            builder.Services.AddSingleton<ISemanticTextMemory>(sp =>
            {
                var store = sp.GetRequiredService<IMemoryStore>();
                var embedder = new OllamaApiClient(reader["OLLAMA_API_URL"], "chroma/all-minilm-l6-v2-f32")
                    .AsTextEmbeddingGenerationService();
                return new SemanticTextMemory(store, embedder);
            });

            builder.Services.AddTransient(services =>
            {
                var kernel = new Kernel(services);

                return kernel;
            });

            return builder;
        }

        public static IUmbracoBuilder AddCustomServices(this IUmbracoBuilder builder)
        {
            builder.RegisterCustomServices();
            return builder;
        }
    }
}
