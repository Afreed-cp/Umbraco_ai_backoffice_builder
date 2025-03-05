using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.SemanticKernel.ChatCompletion;

namespace AI_Backoffice_builder.Core.Services.Interfaces
{
    public interface IPlanProvider
    {
        ChatHistory GetPlan(string fileName);
    }
}
