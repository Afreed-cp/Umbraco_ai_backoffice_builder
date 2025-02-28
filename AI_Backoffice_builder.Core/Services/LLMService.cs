using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.TextGeneration;

namespace AI_Backoffice_builder.Core.Services
{
    public class LLMService
    {
        private readonly Kernel _kernel;

        public LLMService(Kernel kernel)
        {
            _kernel = kernel;
        }

        public async Task<string> GetDocumentTypeName()
        {
            // Implement logic to get the document type name from the LLM
            return "ExampleDocumentType";
        }

        public async Task<string> GetFieldNames()
        {
            // Implement logic to get the field names from the LLM
            return "Title,Content,Summary,Order";
        }

        public async Task<string> InferFieldTypes(string fieldNames)
        {
            var fields = fieldNames.Split(',');
            var inferredTypes = new List<string>();

            foreach (var field in fields)
            {
                // Use natural language processing to infer the type of the field
                string type = await InferTypeFromFieldName(field);
                inferredTypes.Add($"{field}:{type}");
            }

            return string.Join(",", inferredTypes);
        }

        private async Task<string> InferTypeFromFieldName(string fieldName)
        {
            // Use the Semantic Kernel to infer the type of the field
            var prompt = $"Infer the type of the field based on its name: {fieldName}";
            var textGenerationService = _kernel.GetRequiredService<ITextGenerationService>();
            var result = await textGenerationService.GetTextContentAsync(prompt);

            return result.Text;
        }
    }
}