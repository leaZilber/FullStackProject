namespace FinalProject.API.Models
{
    public class VisionApiResponse
    {
        public VisionApiResponseItem[] Responses { get; set; }

        public VisionApiResponse(VisionApiResponseItem[] responses)
        {
            Responses = responses;
        }
    }

    public class VisionApiResponseItem
    {
        public VisionApiResponseItem(VisionApiLabelAnnotation[] labelAnnotations)
        {
            LabelAnnotations = labelAnnotations;
        }

        public VisionApiLabelAnnotation[] LabelAnnotations { get; set; }
    }

    public class VisionApiLabelAnnotation
    {
        public string Description { get; set; }
        public float Score { get; set; }

        public VisionApiLabelAnnotation(string description, float score)
        {
            Description = description;
            Score = score;
        }
    }
}
