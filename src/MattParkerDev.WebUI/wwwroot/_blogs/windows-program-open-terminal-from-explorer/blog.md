I spent the weekend building a tiny Windows program, to launch a Windows Terminal window in the directory of an open Explorer window.

 ![explorerOpenTerminal](https://github.com/user-attachments/assets/84e96531-90f6-4e6f-a0d8-b74bf7058f36)

Oh my was it a can of worms! I felt like a true .NET Framework developer from the 2000's, wading through Win32 APIs and COM interfaces to achieve what seemed like a simple task from the outset.

The full source code is available on GitHub https://github.com/MattParkerDev/ExplorerOpenTerminal, and you can download the latest release [here](https://github.com/MattParkerDev/ExplorerOpenTerminal/releases/latest) if you'd like to use it for yourself!

#### High Level Requirements
* Get the active windows explorer window
* Retrieve the folder path
* Launch a new process, opening Windows Terminal (wt.exe), using this directory

#3 was the easy part, so let's dive into the first two!

##### Microsoft.Windows.CsWin32
Of note, I used the Microsoft.Windows.CsWin32 NuGet package, to source generate PInvoke methods for Win32 APIs, e.g.:

`NativeMethods.txt`
```txt
GetForegroundWindow
```
means I can now call:
```csharp
HWND activeWindow = PInvoke.GetForegroundWindow();
```

Another important note, our main method must be decorated with `[STAThread]`, denoted a "Single Threaded Apartment", without which some of the COM methods will not work.

#### 1. Get the active windows explorer window
First, we need to get the active window, and its name - to determine if it is a windows explorer window.
```csharp
private static (IntPtr, string) GetForegroundWindow()
{
	var activeWindow = PInvoke.GetForegroundWindow();
	var className = GetWindowClassName(activeWindow);
	return (activeWindow, className);
}

private static string GetWindowClassName(HWND windowHandle)
{
	Span<char> charSpan = stackalloc char[256];
	PInvoke.GetClassName(windowHandle, charSpan);

	var className = charSpan.ToString().Trim('\0'); // Trim null characters
	return className;
}
```

Easy! Unfortunately, as I would later find out, when launched via the shortcut key, our application steals focus from the explorer window we were in, leaving us unable to determine our desired explorer window.
I tried to find a Win32 method to do something like `GetPreviouslyActiveWindow`, to no avail, and decided to do a dodgy workaround of calling alt+tab to refocus the previous window 😅.

our main method so far: `Program.cs`
```csharp
public static void Main()
{
	var (activeWindow, className) = GetForegroundWindow();

	if (className is not "CabinetWClass")
	{
		Console.WriteLine($"Active window ({className}) is not an Explorer window, calling Alt+Tab");
		CallAltTab();
		(activeWindow, className) = GetForegroundWindow();
	}
	if (className is not "CabinetWClass")
	{
		Console.WriteLine($"Active window ({className}) is not an Explorer window.");
		return;
	}
	...
}
```
Summarised in pseudocode: if the active window is not a windows explorer window (CabinetWClass), call Alt+Tab, and check again. If its still not, then don't proceed.

The `CallAltTab()` method is not pretty but you can view it [here](https://github.com/MattParkerDev/ExplorerOpenTerminal/blob/03feec9c85401bb45d7d85e0dcace358d92804ad/src/ExplorerOpenTerminal/Program.cs#L62)

So now we have the handle for our active explorer window, which would be some thing like `0x50f16`. Let's get the folder path.

#### 2. Retrieve the folder path
The largest spanner in the works was tabs inside a single explorer window. We currently know which window is focused, but we don't know which tab the user is in!

![image](https://github.com/user-attachments/assets/d24cc2d4-6b25-4d77-9dae-a782cd06c137)
Figure: Two explorer windows, with a total of 3 tabs

Using a tool bundled with Visual Studio called Spy++ (spyxx.exe), we can find our desired explorer window. Alt+F3 opens the find dialog, and we can then drag the target icon onto the explorer window:

![image](https://github.com/user-attachments/assets/29086ad0-6e6d-4d07-99f2-90aea13a8422)

This then selects the window in the list (of type CabinetWClass, which we expect, and matches the handle `0x50f16` we are returned from GetForegroundWindow)

![image](https://github.com/user-attachments/assets/b649b50c-db05-4d29-bee3-d1a6fb461bbc)

There are two `ShellTabWindowClass` children inside the window, which represent the tabs the user has open.

Using `PInvoke.FindWindowEx`, we can search for a `ShellTabWindowClass` based on its parent `CabinetWClass`, and luckily for us, the method retrieves the active tab as the first result!

```csharp
var activeTab = PInvoke.FindWindowEx(new HWND(parentHandle), new HWND(IntPtr.Zero), "ShellTabWindowClass", null);
```

We pass in the parent `CabinetWClass` handle, and get back the handle `0x00050e40` to the active `ShellTabWindowClass`.

Now comes the fun! There is no way to retrieve the full directory path from a `ShellTabWindowClass` directly, so we must go through 3 layers of COM interface indirection to get the data we want 😅

First, we instantiate a new COM Object and cast it to the IShellWindows interface
```csharp
private static string? GetActiveExplorerTabPath(IntPtr hwnd)
{
	var shellWindows = (IShellWindows)new ShellWindows();
	Guard.Against.Null(shellWindows);
}
```
An [IShellWindows](https://learn.microsoft.com/en-us/windows/win32/api/exdisp/nn-exdisp-ishellwindows) interface allows us to enumerate all open Shell windows.

Recalling our 3 open tabs from above, if we enumerate the open shell windows, we get 3 results, lining up with the 3 open tabs open across the two windows.

```csharp
for (var i = 0; i < shellWindows.Count; i++) // Count = 3
{
	var windowObject = shellWindows.Item(i);
	dynamic window = windowObject;
	var windowPointer = window.HWND;
}
```

We can also get the folder path from the window object

```csharp
var windowPath = window!.Document.Folder.Self.Path as string;
```

Unfortunately the handles for these results are for the parent window, not the tab e.g.
```
0xd409b6	| windowPath = "C:\Users\Matthew\Documents\Git\ExplorerOpenTerminal\artifacts\publish\ExplorerOpenTerminal\release"
0x50f16		| windowPath = "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\Tools"
0x50f16		| windowPath = "C:\Users\Matthew\Documents\Git\ExplorerOpenTerminal"
```

We know that `0x50f16` is the handle of the active parent window, so we know the tab we want is the 2nd or 3rd one.

Think of it like this:

| Parent Window Handle | Tab Handle | Path                                                                                               |
|----------------------|------------|----------------------------------------------------------------------------------------------------|
| 0xd409b6             | ???        | C:\Users\Matthew\Documents\Git\ExplorerOpenTerminal\artifacts\publish\ExplorerOpenTerminal\release |
| 0x50f16              | ???        | C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\Tools                             |
| 0x50f16              | 0x00050e40 | C:\Users\Matthew\Documents\Git\ExplorerOpenTerminal                                                |

<br>

We need to find the parent window object, where the tab handle matches the active tab handle we found earlier, so we can retrieve the correct path.

Lets proceed!

`continue` if the parent window pointer does not match our target window (eliminating the first row in the table above)
```csharp
for (var i = 0; i < shellWindows.Count; i++)
{
	var windowObject = shellWindows.Item(i);
	dynamic window = windowObject;
	var windowPointer = (IntPtr)window.HWND;
	if (window == null || windowPointer != hwnd)
		continue;
}
```

We cast the window object to an [IWebBrowser2](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa752127(v=vs.85)) interface, and then cast that to an [IServiceProvider](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/cc678965(v=vs.85)) interface

```csharp
var webBrowser2 = (IWebBrowser2) windowObject;
var serviceProvider = (IServiceProvider) webBrowser2;
```

Using the IServiceProvider interface, we can query for a service of interface type [IShellBrowser](https://learn.microsoft.com/en-us/windows/win32/api/shobjidl_core/nn-shobjidl_core-ishellbrowser) using [QueryService](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/cc678966(v=vs.85))

```csharp
Guid _iidIShellBrowser = typeof(IShellBrowser).GUID;
serviceProvider.QueryService(in PInvoke.SID_STopLevelBrowser, in _iidIShellBrowser, out var shellBrowserObject);
var shellBrowser = (IShellBrowser) shellBrowserObject;
```

IShellBrowser inherits [IOleWindow](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nn-oleidl-iolewindow), which has a method [GetWindow](https://learn.microsoft.com/en-us/windows/win32/api/oleidl/nf-oleidl-iolewindow-getwindow) which we can use to get the window handle of the active tab

```csharp
shellBrowser.GetWindow(out var windowHandle);
```

Finally, we can compare the tab handle to the active tab handle (remembering that we are enumerating the shell windows), and if they match, we can retrieve and return the folder path!

```csharp
if (windowHandle == activeTab)
{
	var windowPath = window!.Document.Folder.Self.Path as string;
	return windowPath;
}
```

The complete method:

```csharp
private static string? GetActiveExplorerPath(IntPtr hwnd)
{
	// The first result is the active tab
	var activeTab = PInvoke.FindWindowEx(new HWND(hwnd), new HWND(IntPtr.Zero), "ShellTabWindowClass", null);

	var shellWindows = (IShellWindows)new ShellWindows();
	Guard.Against.Null(shellWindows);
	for (var i = 0; i < shellWindows.Count; i++)
	{
		var windowObject = shellWindows.Item(i);
		dynamic window = windowObject;
		var windowPointer = (IntPtr)window.HWND;
		if (window == null || windowPointer != hwnd)
			continue;

		var windowPath = window!.Document.Folder.Self.Path as string;
		var webBrowser2 = (IWebBrowser2) windowObject;

		var serviceProvider = (IServiceProvider) webBrowser2;

		serviceProvider.QueryService(in PInvoke.SID_STopLevelBrowser, in _iidIShellBrowser, out var shellBrowserObject);
		var shellBrowser = (IShellBrowser) shellBrowserObject;

		shellBrowser.GetWindow(out var windowHandle);
		if (windowHandle == activeTab)
		{
			return windowPath;
		}
	}

	return null;
}
```

The hard part is over!

We now just start a new process ☺️

```csharp
private static void LaunchWindowsTerminalInDirectory(string directory)
{
	var process = new Process
	{
		StartInfo = new ProcessStartInfo
		{
			FileName = "wt",
			Arguments = $"""-d "{directory}" """,
			UseShellExecute = false,
			CreateNoWindow = false,
		}
	};
	process.Start();
}
```

And we are done!

#### Prior Art
I found an AutoHotKey discussion [here](https://www.autohotkey.com/boards/viewtopic.php?t=109907), which does a similar thing like so:
```
#Requires AutoHotkey v2.0-beta.11
GetActiveExplorerTab(hwnd := WinExist("A")) {
    activeTab := 0
    try activeTab := ControlGetHwnd("ShellTabWindowClass1", hwnd) ; File Explorer (Windows 11)
    catch
    try activeTab := ControlGetHwnd("TabWindowClass1", hwnd) ; IE
    for w in ComObject("Shell.Application").Windows {
        if w.hwnd != hwnd
            continue
        if activeTab { ; The window has tabs, so make sure this is the right one.
            static IID_IShellBrowser := "{000214E2-0000-0000-C000-000000000046}"
            shellBrowser := ComObjQuery(w, IID_IShellBrowser, IID_IShellBrowser)
            ComCall(3, shellBrowser, "uint*", &thisTab:=0)
            if thisTab != activeTab
                continue
        }
        return w
    }
}
```

The main difference is a "blind" call to a COM method on the IShellBrowser object, at index 3. I was able to replicate this in C# like so:

```csharp
[UnmanagedFunctionPointer(CallingConvention.StdCall)]
private delegate int GetActiveTabDelegate(IntPtr shellBrowser, out IntPtr thisTabPointer);
...

IntPtr comPtr = Marshal.GetComInterfaceForObject(shellBrowser, typeof(IShellBrowser));
IntPtr vTable = Marshal.ReadIntPtr(comPtr);
var functionPointer = Marshal.ReadIntPtr(vTable, 3 * Marshal.SizeOf<nint>());
var functionDelegate = Marshal.GetDelegateForFunctionPointer<GetActiveTabDelegate>(functionPointer);
functionDelegate(comPtr, out var windowTabPointer);
if (windowTabPointer == activeTab)
{
	return windowPath;
}
```

COM Interfaces store the methods it contains in what is called a VTable, which can be queried to discover what methods are available. We call `Marshal.GetDelegateForFunctionPointer` to give us a delegate to call that COM method. We define the delegate signature in our code, which really does make it a "blind" call.

To enumerate the methods available on a COM Interface, the following code can be used ([found here](https://stackoverflow.com/questions/3504848/access-com-vtable-from-c-sharp)):

```csharp
IntPtr comPtr = Marshal.GetComInterfaceForObject(shellBrowser, typeof(IShellBrowser));
IntPtr vTable = Marshal.ReadIntPtr(comPtr);
int start = Marshal.GetStartComSlot(typeof(IShellBrowser));
int end = Marshal.GetEndComSlot(typeof(IShellBrowser));

ComMemberType mType = 0;
for (var j = start; j <= end; j++)
{
	System.Reflection.MemberInfo memberInfo = Marshal.GetMethodInfoForComSlot(typeof(IShellBrowser), i, ref mType);
	var functionAddress = Marshal.ReadIntPtr(vTable, j * Marshal.SizeOf<nint>()).ToInt64();
	Console.WriteLine("Method {0} at address 0x{1:X}", memberInfo.Name, functionAddress);
}
```

[Marshal.GetStartComSlot](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.marshal.getstartcomslot) and [GetEndComSlot](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.marshal.getendcomslot), get the first and last slots of the VTable that contain user defined methods. We then use the magical [GetMethodInfoForComSlot](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.marshal.getmethodinfoforcomslot) (which only exists in .NET Framework by the way, I had to run my program using .NET 4.8.1 for this to work), to get the names of the methods at all of the function addresses.

Luckily for me, the first method (at index 3, as used in the AHK script), was `GetWindow`, which I could see existed on `IShellBrowser`, so I could scrap all of this code and just call GetWindow directly! (Back to .NET 9, phew! 😅)

```csharp
[global::System.CodeDom.Compiler.GeneratedCode("Microsoft.Windows.CsWin32", "0.3.183+73e6125f79.RR")]
internal interface IShellBrowser : winmdroot.System.Ole.IOleWindow {
	unsafe new void GetWindow(winmdroot.Foundation.HWND* phwnd);

	...
}
```

##### Conclusion
This was an interesting project, and I learnt a lot from trawling the internet, trying to find anything remotely similar to what I was trying to achieve 😅. I read examples on forums in at least 4 different languages due to the nature of COM interfaces (language agnostic!), including AutoHotKey script, C++, C# and Delphi!

I am not envious of developers 20+ years ago, and hope to never have to use my new-found knowledge professionally 😅.
