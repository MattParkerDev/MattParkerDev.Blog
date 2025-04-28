using MattParkerDev.WebUI.Services;

namespace MattParkerDev.WebUI.Models;

public class OtlpTrace
{
	public required DateTimeOffset StartTime { get; set; }
	public required DateTimeOffset? EndTime { get; set; }
	public required TimeSpan? FinalDuration { get; set; }
	public required bool Finished { get; set; }
	public required string Name { get; set; }

	public TimeSpan ElapsedDuration => ((EndTime ?? CustomTimeProvider.Custom.GetLocalNow()) - StartTime);
	public double ElapsedDurationSeconds => ElapsedDuration.TotalSeconds;
	public double PercentageOfTimeline => Math.Min(ElapsedDurationSeconds / 30 * 100, 100);

	public TimeSpan DurationSinceFinished => CustomTimeProvider.Custom.GetLocalNow() - EndTime ?? TimeSpan.Zero;
	public double DurationSinceFinishedSeconds => DurationSinceFinished.TotalSeconds;
	public double PercentageOfTimelineSinceFinished => Math.Min(DurationSinceFinishedSeconds / 30 * 100, 100);
}
