namespace MattParkerDev.WebUI.Models;

public sealed class Blog
{
	public required string Slug { get; set; }
	public required string Title { get; set; }
	public required string Description { get; set; }

	//public required string Content { get; set; }
	public required bool IsPublished { get; set; }
	public required List<string> Keywords { get; set; }
	public required DateTimeOffset PublishedDate { get; set; }
	public required int Sequence { get; set; }
	public string? PreviewImageUrl { get; set; }
	public string? PreviewImageIcon { get; set; }
}
