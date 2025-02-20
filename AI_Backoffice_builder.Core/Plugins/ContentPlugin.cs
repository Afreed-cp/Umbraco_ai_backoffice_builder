using AI_Backoffice_builder.Models.Models;
using Microsoft.SemanticKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Services;

namespace AI_Backoffice_builder.Core.Plugins
{
    public class ContentPlugin
    {
        private readonly IContentService _contentService;

        public ContentPlugin(IContentService contentService)
        {
            _contentService = contentService;
        }
        [KernelFunction("get_content")]
        [Description("Get all content from Umbraco backoffice.")]
        public IEnumerable<ContentModel> GetContent()
        {
            var entities = _contentService.GetPagedDescendants(-1, 0, int.MaxValue, out _);
            foreach (var entity in entities)
            {
                yield return new(entity);
            }
        }

        [KernelFunction("get_content")]
        [Description("Get content from Umbraco backoffice by content name.")]
        public IEnumerable<ContentModel> GetContent(string name)
        {
            var entities = _contentService.GetPagedDescendants(-1, 0, int.MaxValue, out _);
            foreach (var entity in entities)
            {
                yield return new(entity);
            }
        }
    }
}
