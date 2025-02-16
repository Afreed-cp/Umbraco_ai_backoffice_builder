using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace AI_Backoffice_builder.Core.DI
{
    public class DIComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            // we register all the services in one place
            builder.AddCustomServices();

        }
    }

}
