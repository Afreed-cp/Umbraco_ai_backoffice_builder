namespace AI_Backoffice_builder.Core.Constants
{
    public static class DataTypeConstants
    {
        public static readonly Dictionary<string, string> PropertyEditorAliasMapping = new()
        {
            { "textstring", "Umbraco.TextBox" },
            { "textarea", "Umbraco.TextArea" },
            { "richtexteditor", "Umbraco.TipTap" },
            { "numeric", "Umbraco.Integer" },
            { "multipletextstring", "Umbraco.MultipleTextstring" },
            { "boolean", "Umbraco.TrueFalse" }
        };
    }
}
