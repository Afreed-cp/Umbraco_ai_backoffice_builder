using Microsoft.AspNetCore.Mvc;
using AI_Backoffice_builder.Core.Services.Interfaces;

namespace AI_Backoffice_builder.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatApiController : Controller
    {
        private readonly ISemanticKernelService _semanticKernel;

        public ChatApiController(ISemanticKernelService semanticKernel)
        {
            _semanticKernel = semanticKernel;
        }

        [HttpPost("send")]
        public async Task<JsonResult> SendMessage(ChatMessage message)
        {
            var response = await _semanticKernel.ChatAsync(message.Message!);
            return new JsonResult(new { response });
        }

        public async Task<JsonResult> Check()
        {  
            return new JsonResult("test");
        }

        [HttpPost("clear")]
        public IActionResult ClearChat()
        {
            _semanticKernel.ClearHistory();
            return Ok();
        }
    }

    public class ChatMessage
    {
        public string? Message { get; set; } = string.Empty;
    }

}
