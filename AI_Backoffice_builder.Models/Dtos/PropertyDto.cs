using System;

namespace AI_Backoffice_builder.Models.Dtos
{
    public class PropertyDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public ContainerDto Container { get; set; }
        public int SortOrder { get; set; }
        public string Alias { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DataTypeDto DataType { get; set; }
        public bool VariesByCulture { get; set; }
        public bool VariesBySegment { get; set; }
        public ValidationDto Validation { get; set; } = new();
        public AppearanceDto Appearance { get; set; } = new();
    }

    public class ContainerDto
    {
        public Guid Id { get; set; }
    }

    public class DataTypeDto
    {
        public Guid Id { get; set; }
    }

    public class ValidationDto
    {
        public bool Mandatory { get; set; }
        public string MandatoryMessage { get; set; }
        public string RegEx { get; set; }
        public string RegExMessage { get; set; }
    }

    public class AppearanceDto
    {
        public bool LabelOnTop { get; set; }
    }
}
