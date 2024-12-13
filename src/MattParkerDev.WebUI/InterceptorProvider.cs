namespace MattParkerDev.WebUI;

public class InterceptorProvider : ILoggerProvider
{
	public void Dispose()
	{
		throw new NotImplementedException();
	}

	public ILogger CreateLogger(string categoryName)
	{
		return new Logger<object>(new LoggerFactory());
	}
}
