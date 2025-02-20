using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.ContentEditing;

namespace AI_Backoffice_builder.Models.Models
{
    public class ContentModel : UmbracoEntity
    {
        public ContentModel(IContent entity):base(entity) {
            Name = entity.Name;
            Type = UmbracoEntityTypes.Document;
            ContentType = entity.ContentType.Alias;
        }

        public override string Name { get; }

        public override UmbracoEntityTypes Type { get; }
        public string ContentType { get;}

        public override string GetUrl()
        {
            return $"section/content/workspace/document/edit/{Key}";
        }
    }
}
