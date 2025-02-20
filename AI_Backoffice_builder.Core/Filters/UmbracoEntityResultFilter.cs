using AI_Backoffice_builder.Models.Models;
using Microsoft.SemanticKernel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AI_Backoffice_builder.Core.Filters
{
    public class UmbracoEntityResultFilter : IFunctionInvocationFilter
    {

        public async Task OnFunctionInvocationAsync(FunctionInvocationContext context, Func<FunctionInvocationContext, Task> next)
        {
            await next(context);

            var result = context.Result.GetValue<object>();

            if (result is not IEnumerable<UmbracoEntity> entities)
            {
                entities = result is UmbracoEntity entity ? [entity] : [];
            }
            context.Kernel.Data["entity"] = entities.FirstOrDefault();
        }
    }
}
