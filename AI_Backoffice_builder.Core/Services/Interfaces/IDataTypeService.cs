using System;
using System.Threading.Tasks;

namespace AI_Backoffice_builder.Core.Services.Interfaces
{
    public interface IDataTypeServiceGetter
    {
        Task<Guid> GetDataTypeUniqueIdByAlias(string alias);
    }
}
