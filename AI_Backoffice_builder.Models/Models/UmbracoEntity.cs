using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Models.Entities;


namespace AI_Backoffice_builder.Models.Models
{
    public abstract class UmbracoEntity
    {
        public UmbracoEntity(IEntity entity)
        {
            Id = entity.Id;
            Key = entity.Key;
            CreatedDate = entity.CreateDate;
            UpdateDate = entity.UpdateDate;
        }

        public virtual int Id { get; }

        public virtual Guid Key { get; }

        public abstract string Name { get; }

        public abstract UmbracoEntityTypes Type { get; }

        public DateTime CreatedDate { get; }
        public DateTime UpdateDate { get; }

        public virtual string GetUrl()
        {
            return $"section/settings/workspace/{Type}/edit/{Key}";
        }
    }
}
