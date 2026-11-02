import { formatStars, type Project } from '../lib/projects'

function ProjectStats({ project }: { project: Project }) {
  return (
    <p className="project-stats">
      <span>
        <span aria-hidden="true">★</span> {formatStars(project.stars)}
        <span className="visually-hidden"> stars on GitHub</span>
      </span>
      <span>{project.language}</span>
    </p>
  )
}

type FeaturedProjectsProps = {
  sharpIde: Project
  sharpDbg: Project
}

export function FeaturedProjects({ sharpIde, sharpDbg }: FeaturedProjectsProps) {
  return (
    <div className="featured">
      <article className="feature feature-ide">
        <div className="feature-copy">
          <h3>
            <a href={sharpIde.url}>{sharpIde.name}</a>
          </h3>
          <p>{sharpIde.description}</p>
          <ProjectStats project={sharpIde} />
        </div>
        <img
          className="screenshot"
          src="https://github.com/user-attachments/assets/bce91555-a1f2-43ab-a525-8353b4c7cff2"
          width="1638"
          height="935"
          loading="lazy"
          decoding="async"
          alt="SharpIDE with a C# project open: a file explorer, the code editor and a Problems panel listing warnings."
        />
      </article>
      <article className="feature feature-dbg">
        <div className="feature-copy">
          <h3>
            <a href={sharpDbg.url}>{sharpDbg.name}</a>
          </h3>
          <p>{sharpDbg.description}</p>
          <ProjectStats project={sharpDbg} />
        </div>
        <pre className="terminal" tabIndex={0}>
          <code>
            <span className="terminal-prompt">$ </span>dotnet tool install --global SharpDbg.Cli
            {'\n'}
            <span className="terminal-prompt">$ </span>sharpdbg --interpreter=vscode
          </code>
        </pre>
      </article>
    </div>
  )
}
