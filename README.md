# Umbraco AI Backoffice Builder

This project is an AI-powered backoffice builder for the open-source Umbraco CMS, leveraging Microsoft Semantic Kernel and various plugins to create backoffice, manage tasks and query CMS entities.

## Getting Started
### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Umbraco CMS](https://our.umbraco.com/download/)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Umbraco_ai_backoffice_builder.git
   cd Umbraco_ai_backoffice_builder
   ```
2. **Restore dependencies:**
   ```sh
   dotnet restore
   ```
3. **Build the solution:**
   ```sh
   dotnet build
   ```
4. **Configure environment variables:** Create a `.env` file in the root directory with necessary configurations.

### Running the Application
1. **Start Umbraco CMS:**
   ```sh
   dotnet run --project AI_Backoffice_builder.Web
   ```
2. **Access the application:** https://localhost:44305/

---

## Project Components
### Core Services
- **ChatHistoryManager:** Manages AI chat history.
- **SemanticKernelService:** Integrates Microsoft Semantic Kernel functionalities.

### Plugins
- **DocumentTypePlugin:** Creates document types in Umbraco backoffice.
- **LightsPlugin:** Manages light states (mock data).

### Controllers
- **ChatApiController:** Handles chat messages via API.

### Dependency Injection
- **DIBuilderExtensions:** Configures and registers services and plugins.

---

## Usage
### Chat API
- **SendMessage:** Sends a chat message and receives a response.
- **ClearChat:** Clears chat history.

### Plugins
#### DocumentTypePlugin
- `create_document_type`: Creates a new document type in Umbraco.
#### LightsPlugin
- `get_lights`: Retrieves light states.
- `change_state`: Changes a light's state.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
Licensed under the [MIT License](LICENSE).

## Acknowledgements
- **Umbraco CMS**
- **Microsoft Semantic Kernel**
- **Ollama**
