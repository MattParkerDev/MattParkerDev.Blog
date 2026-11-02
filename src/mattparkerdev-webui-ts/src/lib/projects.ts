export type Project = {
  name: string
  repo: string
  description: string
  language: string
  /** Used when the GitHub API can't be reached at build time. */
  stars: number
  url: string
}

const repoUrl = (repo: string) => `https://github.com/MattParkerDev/${repo}`

export const FEATURED_PROJECTS: Record<'sharpIde' | 'sharpDbg', Project> = {
  sharpIde: {
    name: 'SharpIDE',
    repo: 'SharpIDE',
    description:
      'A modern, cross-platform and open source IDE for .NET, built with .NET and Godot. It has completions, refactoring, Razor highlighting, and built-in run, debug and build tools.',
    language: 'C#',
    stars: 3851,
    url: repoUrl('SharpIDE'),
  },
  sharpDbg: {
    name: 'SharpDbg',
    repo: 'sharpdbg',
    description:
      'A cross-platform .NET managed code debugger, written completely in C#. It implements the Debug Adapter Protocol, so it works with VS Code and other DAP clients.',
    language: 'C#',
    stars: 344,
    url: repoUrl('sharpdbg'),
  },
}

export const OTHER_PROJECTS: Project[] = [
  {
    name: 'DotNetSolutionTools',
    repo: 'DotNetSolutionTools',
    description: 'Various tools to aid in maintaining .NET solutions.',
    language: 'C#',
    stars: 21,
    url: repoUrl('DotNetSolutionTools'),
  },
  {
    name: 'ParallelPipelines',
    repo: 'ParallelPipelines',
    description: 'Write parallel and concurrent CI/CD pipelines in C#.',
    language: 'C#',
    stars: 9,
    url: repoUrl('ParallelPipelines'),
  },
  {
    name: 'ICorDebugSharp',
    repo: 'ICorDebugSharp',
    description: 'A C# wrapper of the .NET ICorDebug and related APIs.',
    language: 'C#',
    stars: 2,
    url: repoUrl('ICorDebugSharp'),
  },
  {
    name: 'ExplorerOpenTerminal',
    repo: 'ExplorerOpenTerminal',
    description: 'A tiny Windows program to open a terminal from Explorer via shortcut keys.',
    language: 'C#',
    stars: 2,
    url: repoUrl('ExplorerOpenTerminal'),
  },
  {
    name: 'PhotinoBlazor.Template',
    repo: 'PhotinoBlazor.Template',
    description: 'A minimal template to get started with Photino.Blazor.',
    language: 'HTML',
    stars: 3,
    url: repoUrl('PhotinoBlazor.Template'),
  },
]

const starFormat = new Intl.NumberFormat('en-AU')

export const formatStars = (stars: number) => starFormat.format(stars)
