namespace MattParkerDev.WebUI.Services;

public class CustomTimeProvider : TimeProvider
{
	public static CustomTimeProvider Custom { get; } = new CustomTimeProvider();
	public bool Paused { get; private set; }
	private DateTimeOffset? PausedAt { get; set; }
	public override DateTimeOffset GetUtcNow()
	{
		return Paused ? PausedAt!.Value : base.GetUtcNow();
	}

	public void TogglePause()
	{
		if (Paused)
		{
			Resume();
		}
		else
		{
			Pause();
		}
	}
	public void Pause()
	{
		PausedAt = GetUtcNow();
		Paused = true;
	}

	public void Resume()
	{
		Paused = false;
		PausedAt = null;
	}
}
