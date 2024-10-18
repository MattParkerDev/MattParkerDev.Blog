using System.ServiceModel.Syndication;
using System.Xml;
using MattParkerDev.WebUI.Services;

Console.WriteLine("Generating RSS feed...");

var writer = XmlWriter.Create("../../../../src/MattParkerDev.WebUI/wwwroot/feed.xml");

var items = BlogService.Blogs.Select(post => new SyndicationItem(
		post.Title,
		post.Description,
		new Uri("https://mattparker.dev/blog/" + post.Slug)
	)
	{
		Title = new TextSyndicationContent(post.Title),
		Content = new TextSyndicationContent(post.Description),
		PublishDate = post.PublishedDate,
		Authors = { new SyndicationPerson(null, "Matt Parker", "https://mattparker.dev") }
	}
).ToList();

var feed = new SyndicationFeed(items)
{
	Links = { new SyndicationLink(new Uri("https://mattparker.dev/blog")) },
	Title = new TextSyndicationContent("MattParkerDev's Blog"),
	Description =
		new TextSyndicationContent("My portfolio website and where I blog about .NET, Azure and all things software."),
	LastUpdatedTime = DateTimeOffset.Now
};

feed.SaveAsRss20(writer);

writer.Close();

Console.WriteLine("RSS feed generated.");
