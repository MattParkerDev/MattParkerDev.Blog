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
		LayoutProperties = new LayoutProperties()
		{
			DefaultBorderRadius = "4px" // Rounded edges for components
		},
		Typography = new Typography()
		{

		}
	};
}
