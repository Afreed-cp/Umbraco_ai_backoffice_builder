using NPoco;

namespace AI_Backoffice_builder.Core.Models.Database
{
    [TableName("umbracoDataType")]
    [PrimaryKey("nodeId")]
    public class DataTypeModel
    {
        public int nodeId { get; set; }
        public string propertyEditorAlias { get; set; }
        public string? dbType { get; set; }
        public string? config { get; set; }
    }
}
