using NPoco;

namespace AI_Backoffice_builder.Core.Models.Database
{
    [TableName("umbracoNode")]
    [PrimaryKey("id")]
    public class NodeModel
    {
        public int id { get; set; }
        public Guid uniqueId { get; set; }
        public string nodeObjectType { get; set; }
        public int nodeType { get; set; }
        [Column("text")]
        public string Name { get; set; }
    }
}
