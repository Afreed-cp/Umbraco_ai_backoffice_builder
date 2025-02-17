using NPoco;
using System.Data;
using AI_Backoffice_builder.Core.Services.Interfaces;
using AI_Backoffice_builder.Core.Models.Database;

namespace AI_Backoffice_builder.Core.Services
{
    public class DataTypeService : IDataTypeServiceGetter
    {
        private readonly IDatabase _database;

        public DataTypeService(IDatabase database)
        {
            _database = database;
        }

        public async Task<Guid> GetDataTypeUniqueIdByAlias(string alias)
        {
            var mapping = new Dictionary<string, string>
            {
                { "textstring", "Umbraco.TextBox" },
                { "textarea", "Umbraco.TextArea" },
                { "richtexteditor", "Umbraco.TipTap" },  // Updated to TipTap
                { "numeric", "Umbraco.Integer" },
                { "multipletextstring", "Umbraco.MultipleTextstring" },
                { "boolean", "Umbraco.TrueFalse" }
            };

            if (!mapping.TryGetValue(alias.ToLower(), out string editorAlias))
            {
                return Guid.Empty;
            }

            var sql = @"SELECT n.* 
                       FROM umbracoDataType dt 
                       JOIN umbracoNode n ON dt.nodeId = n.id 
                       WHERE dt.propertyEditorAlias = @editorAlias";

            try
            {
                if (_database.Connection.State != ConnectionState.Open)
                {
                    await _database.Connection.OpenAsync();
                }

                using (var transaction = _database.GetTransaction())
                {
                    var node = await _database.FirstOrDefaultAsync<NodeModel>(sql, new { editorAlias });
                    transaction.Complete();
                    return node?.uniqueId ?? Guid.Empty;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving data type for alias {alias}: {ex.Message}", ex);
            }
            finally
            {
                if (_database.Connection.State == ConnectionState.Open)
                {
                    _database.Connection.Close();
                }
            }
        }
    }
}
