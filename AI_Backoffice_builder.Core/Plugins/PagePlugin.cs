using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using AI_Backoffice_builder.Core.Services.Interfaces;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Planning;

namespace AI_Backoffice_builder.Core.Plugins
{
    public class PagePlugin
    {
        private readonly Kernel _kernel;
        private readonly FunctionCallingStepwisePlanner _planner;
        private readonly IPlanProvider _planProvider;

        public PagePlugin(
            Kernel kernel,
            FunctionCallingStepwisePlanner planner,
            IPlanProvider planProvider
        )
        {
            this._kernel = kernel;
            this._planner = planner;
            this._planProvider = planProvider;
        }

        [KernelFunction("get_content")]
        [Description("Get all content from Umbraco backoffice.")]
        public async Task<string> GetContent(string message)
        {
            ChatHistory chatHistory = this._planProvider.GetPlan("content-creation-paln.json");
            FunctionCallingStepwisePlannerResult result = await this._planner.ExecuteAsync(
                this._kernel,
                message,
                chatHistory
            );

            return result.FinalAnswer;
        }
    }
}
