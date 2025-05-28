namespace FinalProject.API.Models
{
    public class VisionApiResponse
    {
        public VisionApiResponseItem[] Responses { get; set; }
    }

    public class VisionApiResponseItem
    {
        public VisionApiLabelAnnotation[] LabelAnnotations { get; set; }
    }

    public class VisionApiLabelAnnotation
    {
        public string Description { get; set; }
        public float Score { get; set; }
    }
}
