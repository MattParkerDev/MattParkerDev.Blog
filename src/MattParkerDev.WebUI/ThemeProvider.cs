using MudBlazor;

namespace MattParkerDev.WebUI;

public static class ThemeProvider
{
	public static readonly MudTheme MyTheme = new()
	{
		PaletteLight = new PaletteLight
		{
			Primary = "#bd9ddd",
			Secondary = "#dad7ea",
			Tertiary = "#9edcad",
			Background = "#fafafa",
			AppbarBackground = "#fafafa",
			AppbarText = "#180202",
			TextPrimary = "#180202",
			SecondaryContrastText = "#180202",
			TextSecondary = "#180202",
			Surface = "#ffffff",
			ActionDefault = "#263238"
		},
		LayoutProperties = new LayoutProperties
		{
			DefaultBorderRadius = "4px" // Rounded edges for components
		},
		Typography = new Typography
		{
			Default = new DefaultTypography
			{
				FontFamily = ["Roboto", "Helvetica", "Arial", "sans-serif"],
				FontSize = "1rem",
				FontWeight = "400",
				LineHeight = "1.5",
				LetterSpacing = "0.00938em"
			},
			H1 = new H1Typography
			{
				FontSize = "5rem",
				FontWeight = "600"
			},
			H2 = new H2Typography
			{
				FontSize = "3.75rem",
				FontWeight = "500"
			},
			H3 = new H3Typography
			{
				FontSize = "3rem",
				FontWeight = "500"
			}
		}
	};

	public static readonly MudMarkdownStyling MarkdownStyling = new()
	{
		CodeBlock = { Theme = CodeBlockTheme.Vs2015 }
	};
}
