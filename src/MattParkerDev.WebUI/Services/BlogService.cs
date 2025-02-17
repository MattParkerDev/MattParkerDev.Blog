using MattParkerDev.WebUI.Models;

namespace MattParkerDev.WebUI.Services;

public static class BlogService
{
	private static readonly TimeSpan TimeZoneOffset = TimeSpan.FromHours(+10); // +10 = AEST

	private static readonly List<Blog> _blogs = new()
	{
		new()
		{
			Sequence = 0,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2023, 08, 1, 9, 0, 0, TimeZoneOffset),
			Slug = "my-first-blog",
			Title = "My First Blog!",
			Keywords = [],
			Description = "A demo blog.",
			PreviewImageUrl = "./_blogs/my-first-blog/image.webp"
		},
		new()
		{
			Sequence = 1,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2023, 10, 01, 8, 0, 0, TimeZoneOffset),
			Slug = "expecting-professionalism",
			Title = "Expecting Professionalism",
			Keywords = [],
			Description = "I am your CTO, and these are my expectations of you.",
			PreviewImageUrl = "./_blogs/expecting-professionalism/image.webp"
		},
		new()
		{
			Sequence = 2,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2023, 10, 08, 14, 10, 0, TimeZoneOffset),
			Slug = "componentizing-image-format-fallback-blazor",
			Title = "Componentizing Image Format Fallback in Blazor",
			Keywords = [],
			Description = "",
			PreviewImageIcon = "./img/blazor.svg"
		},
		new()
		{
			Sequence = 3,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2024, 03, 15, 18, 01, 0, TimeZoneOffset),
			Slug = "efcore-health-checks",
			Title = "Entity Framework Core (EF Core) Health Checks",
			Keywords = [],
			Description = "",
			PreviewImageUrl = "./_blogs/efcore-health-checks/health-check.webp"
		},
		new()
		{
			Sequence = 4,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2024, 10, 13, 23, 50, 0, TimeZoneOffset),
			Slug = "azure-managed-identity-postgres-aspnetcore",
			Title = "ASP.NET Core: Connecting to an Azure PostgreSQL Database with Managed Identity",
			Keywords = ["C#", "EF Core", "Entity Framework", "Azure", "PostgreSQL", "Managed Identity", "ASP.NET Core"],
			Description = "",
			PreviewImageIcon = "./_blogs/azure-managed-identity-postgres-aspnetcore/azure.svg"
		},
		new()
		{
			Sequence = 5,
			IsPublished = true,
			PublishedDate = new DateTimeOffset(2025, 02, 18, 12, 13, 0, TimeZoneOffset),
			Slug = "windows-program-open-terminal-from-explorer",
			Title = "Creating a Windows Program to Open a Terminal from Explorer",
			Keywords = ["Windows", "Explorer", "Terminal", "C#", "Win32", "COM Interface"],
			Description = "",
			PreviewImageIcon = "./_blogs/windows-program-open-terminal-from-explorer/windows-explorer.svg"
		}
	};

	public static List<Blog> Blogs => _blogs.Where(x => x.IsPublished is true).OrderBy(x => x.Sequence).ToList();

	public static Blog? GetBlogBySlug(string slug)
	{
		return Blogs.FirstOrDefault(b => b.Slug == slug);
	}

	public static string GetBlogTitleBySlug(string slug)
	{
		return Blogs.Where(b => b.Slug == slug).Select(s => s.Title).First();
	}

	public static List<string> SlugList => Blogs.Select(b => b.Slug).ToList();
}
