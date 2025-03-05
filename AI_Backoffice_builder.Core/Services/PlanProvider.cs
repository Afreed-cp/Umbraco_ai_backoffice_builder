using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AI_Backoffice_builder.Core.Services.Interfaces;
using Microsoft.SemanticKernel.ChatCompletion;

namespace AI_Backoffice_builder.Core.Services
{
    public class PlanProvider : IPlanProvider
    {
        public ChatHistory GetPlan(string fileName)
        {
            var plan = File.ReadAllText($"Resources/{fileName}");
            return JsonSerializer.Deserialize<ChatHistory>(plan)!;
        }
    }
}
