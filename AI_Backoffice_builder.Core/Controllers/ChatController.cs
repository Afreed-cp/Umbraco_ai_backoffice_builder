using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using AI_Backoffice_builder.Core.Services;

namespace AI_Backoffice_builder.Core.Controllers;


public class ChatController : SurfaceController
{
    private readonly SemanticKernelService _semanticKernel;

    public ChatController(SemanticKernelService semanticKernel,IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _semanticKernel = semanticKernel;
    }

    public IActionResult Index()
    {
        return View("chat/index");
    }
}