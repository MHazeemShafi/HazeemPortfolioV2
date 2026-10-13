import { useEffect, useRef, useState } from "react";
import "./App.css";

const EMAIL = "stryker461@gmail.com";
const GITHUB = "https://github.com/MHazeemshafi";
const LINKEDIN =
  "https://in.linkedin.com/in/mohammed-hazeem-shafi-b06aa9386";

const projects = [
  {
    number: "01",
    name: "GitHub Profile Analyzer",
    description:
      "A web tool for exploring GitHub profile information through a clean interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    demo: "https://mhazeemshafi.github.io/github-profile-analyzer/",
    source: "https://github.com/MHazeemshafi/github-profile-analyzer",
  },
  {
    number: "02",
    name: "PixelShrink",
    description:
      "An image utility project designed to make image optimization straightforward.",
    technologies: ["HTML", "CSS", "JavaScript"],
    demo: "https://mhazeemshafi.github.io/PixelShrink/",
    source: "https://github.com/MHazeemshafi/PixelShrink",
  },
  {
    number: "03",
    name: "HazeemPortfolio",
    description:
      "My personal portfolio for presenting my development work and skills.",
    technologies: ["React", "JavaScript", "CSS"],
    demo: "https://mhazeemshafi.github.io/HazeemPortfolio/",
    source: GITHUB,
  },
  {
    number: "04",
    name: "Ec0Watt",
    description:
      "A website project exploring an energy-focused concept.",
    technologies: ["HTML", "CSS", "JavaScript"],
    demo: "https://mhazeemshafi.github.io/Ec0Watt/",
    source: GITHUB,
  },
];

const skillGroups = [
  {
    title: "WEB DEVELOPMENT",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "PROGRAMMING",
    skills: ["Python", "Java", "C"],
  },
  {
    title: "AREAS OF INTEREST",
    skills: ["Web Development", "Machine Learning"],
  },
];

const commands = [
  "help",
  "about",
  "education",
  "skills",
  "projects",
  "contact",
  "github",
  "linkedin",
  "email",
  "clear",
];

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const characters =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ";
    const fontSize = 16;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let columns = 0;
    let drops = [];
    let frameId;
    let lastFrame = 0;
    let stopped = false;

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      columns = Math.ceil(window.innerWidth / fontSize);
      drops = Array.from(
        { length: columns },
        () => Math.random() * (window.innerHeight / fontSize)
      );
    }

    function draw(timestamp) {
      if (stopped) return;

      if (timestamp - lastFrame < 45) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      lastFrame = timestamp;

      context.fillStyle = "rgba(2, 8, 5, 0.09)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const character =
          characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        context.fillStyle =
          Math.random() > 0.98
            ? "#d8ffe2"
            : `rgba(0, 255, 95, ${0.15 + Math.random() * 0.4})`;

        context.fillText(character, x, y);

        if (
          y > window.innerHeight &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        } else {
          drops[i] += 0.4 + Math.random() * 0.4;
        }
      }

      if (!reducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    resizeCanvas();

    if (reducedMotion) {
      context.fillStyle = "#020805";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      draw(100);
    } else {
      frameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
}

function SectionHeading({ number, children }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>{children}</h2>
      <span className="heading-line" />
    </div>
  );
}

function Terminal({ onCommand }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "ZEPHYRUS TERMINAL v1.0.0" },
    { type: "system", text: "Portfolio interface initialized." },
    { type: "system", text: 'Type "help" to view commands.' },
  ]);

  function submitCommand(event) {
    event.preventDefault();

    const entered = input.trim();
    if (!entered) return;

    const command = entered.toLowerCase();
    const next = [
      ...history,
      { type: "command", text: entered },
    ];

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = {
      help: commands.join("   "),
      about:
        "Computer Science student interested in web development, building projects, and exploring machine learning.",
      education:
        "Pace Institute of Technology & Sciences\nComputer Science\nExpected graduation: 2029",
      skills:
        "HTML | CSS | JavaScript | React | Python | Java | C",
      projects: projects
        .map((project) => `${project.number}. ${project.name}`)
        .join("\n"),
      contact: `Email: ${EMAIL}\nGitHub: ${GITHUB}\nLinkedIn: ${LINKEDIN}`,
    };

    if (Object.prototype.hasOwnProperty.call(output, command)) {
      next.push({ type: "output", text: output[command] });

      if (
        ["about", "education", "skills", "projects", "contact"].includes(
          command
        )
      ) {
        onCommand(command);
      }
    } else if (command === "github") {
      next.push({ type: "output", text: "Opening GitHub..." });
      window.open(GITHUB, "_blank", "noopener,noreferrer");
    } else if (command === "linkedin") {
      next.push({ type: "output", text: "Opening LinkedIn..." });
      window.open(LINKEDIN, "_blank", "noopener,noreferrer");
    } else if (command === "email") {
      next.push({ type: "output", text: `Opening email to ${EMAIL}...` });
      window.location.href = `mailto:${EMAIL}`;
    } else {
      next.push({
        type: "error",
        text: `Unknown command: ${entered}. Type "help".`,
      });
    }

    setHistory(next);
    setInput("");
  }

  return (
    <div className="terminal">
      <div className="terminal-topbar">
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <span className="terminal-title">guest@zephyrus: ~</span>

        <span className="terminal-status">
          <span className="status-dot" />
          ONLINE
        </span>
      </div>

      <div className="terminal-body">
        {history.map((item, index) => (
          <div
            className={`terminal-line ${item.type}`}
            key={`${index}-${item.text}`}
          >
            {item.type === "command" && (
              <span className="prompt">guest@zephyrus:~$ </span>
            )}

            {item.type === "system" && (
              <span className="system-prefix">[SYS] </span>
            )}

            <span className="terminal-output">{item.text}</span>
          </div>
        ))}

        <form className="terminal-input-line" onSubmit={submitCommand}>
          <label className="prompt" htmlFor="terminal-input">
            guest@zephyrus:~$
          </label>

          <input
            id="terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Enter terminal command"
          />

          <span className="input-cursor" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  const [activeCommand, setActiveCommand] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  function handleCommand(command) {
    setActiveCommand(command);

    const section = document.getElementById(command);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className={`app-shell ${booted ? "booted" : ""}`}>
      <MatrixRain />
      <div className="screen-overlay" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">Z</span>
          <span>
            ZEPHYRUS<span className="brand-period">.</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">ABOUT</a>
          <a href="#education">EDUCATION</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="header-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              PERSONAL DEVELOPER TERMINAL
            </p>

            <p className="hero-intro">Hello, world. I am</p>

            <h1>
              MOHAMMED
              <br />
              <span>HAZEEM SHAFI</span>
            </h1>

            <div className="role-line">
              <span className="role-symbol">&gt;_</span>
              <span>Computer Science Student</span>
              <span className="role-divider">/</span>
              <span>Developer in Progress</span>
            </div>

            <p className="hero-description">
              Exploring the web, writing code, and turning ideas into
              projects — one line at a time.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                EXPLORE PROJECTS <span>↗</span>
              </a>

              <a
                className="button button-secondary"
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
              >
                VIEW GITHUB
              </a>
            </div>

            <div className="hero-meta">
              <span>
                <span className="meta-dot" />
                CURRENTLY LEARNING
              </span>
              <span>WEB DEVELOPMENT &amp; MACHINE LEARNING</span>
            </div>
          </div>

          <div className="hero-terminal-wrap">
            <div className="terminal-label">
              <span>LIVE INTERFACE</span>
              <span>INTERACTIVE MODE ENABLED</span>
            </div>

            <Terminal onCommand={handleCommand} />

            <p className="terminal-hint">
              TRY{" "}
              <button onClick={() => handleCommand("education")}>
                education
              </button>
              ,{" "}
              <button onClick={() => handleCommand("projects")}>
                projects
              </button>
              ,{" "}
              <button onClick={() => handleCommand("skills")}>
                skills
              </button>{" "}
              OR{" "}
              <button onClick={() => handleCommand("help")}>
                help
              </button>
            </p>
          </div>

          <div className="hero-scroll">
            <span className="scroll-line" />
            SCROLL TO EXPLORE
          </div>

          <span className="hero-coordinate">SYS.COORD // 01</span>
        </section>

        <section className="content-section section-wrap" id="about">
          <SectionHeading number="01">ABOUT ME</SectionHeading>

          <div className="about-grid">
            <div className="about-main">
              <p className="section-kicker">A LITTLE ABOUT THE DEVELOPER</p>

              <h3>
                Curious mind.
                <br />
                <span>Practical builder.</span>
              </h3>

              <p>
                I’m a Computer Science student at Pace Institute of
                Technology &amp; Sciences who enjoys learning how software
                works and building projects that put that knowledge into
                practice.
              </p>

              <p>
                I’m strengthening my development skills, experimenting
                with web technologies, and exploring machine learning.
                I believe the best way to learn is to build, test, and try
                again.
              </p>
            </div>

            <div className="about-side">
              <div className="data-row">
                <span>IDENTITY</span>
                <strong>Developer / Student</strong>
              </div>

              <div className="data-row">
                <span>FOCUS</span>
                <strong>Web Development</strong>
              </div>

              <div className="data-row">
                <span>EXPLORING</span>
                <strong>Machine Learning</strong>
              </div>

              <div className="data-row">
                <span>STATUS</span>
                <strong className="green-text">Always Learning</strong>
              </div>

              <div className="about-decoration" aria-hidden="true">
                <span>01001010</span>
                <span>10110101</span>
                <span>01010111</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section section-wrap" id="education">
          <SectionHeading number="02">EDUCATION</SectionHeading>

          <div className="education-card">
            <div className="education-symbol" aria-hidden="true">
              &gt;_
            </div>

            <div className="education-content">
              <div className="education-topline">
                <span className="section-kicker">ACADEMIC BACKGROUND</span>
                <span className="education-year">2029 / EXPECTED</span>
              </div>

              <h3>Pace Institute of Technology &amp; Sciences</h3>
              <p className="education-degree">Computer Science</p>

              <p className="education-description">
                Building a foundation in programming and computer science
                while developing practical projects and exploring web
                development and machine learning.
              </p>

              <div className="education-tags">
                <span>COMPUTER SCIENCE</span>
                <span>SOFTWARE DEVELOPMENT</span>
                <span>CONTINUOUS LEARNING</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section section-wrap" id="skills">
          <SectionHeading number="03">SKILLS &amp; TOOLKIT</SectionHeading>

          <p className="section-lead">
            Technologies I use and continue to improve.
          </p>

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-card" key={group.title}>
                <div className="skill-card-top">
                  <span className="skill-card-number">0{index + 1}</span>
                  <span className="skill-card-icon" aria-hidden="true">
                    {index === 0 ? "</>" : index === 1 ? "{ }" : "[ ]"}
                  </span>
                </div>

                <h3>{group.title}</h3>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <SectionHeading number="04">SELECTED PROJECTS</SectionHeading>

          <div className="projects-intro">
            <p className="section-lead">
              Projects I’ve built and continue to develop.
            </p>
            <span className="project-count">04 PROJECT ENTRIES</span>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-top">
                  <span className="project-number">/{project.number}</span>
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="project-stack">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    LIVE DEMO ↗
                  </a>

                  <a href={project.source} target="_blank" rel="noreferrer">
                    SOURCE CODE ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          <a
            className="all-projects-link"
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
          >
            VIEW GITHUB PROFILE →
          </a>
        </section>

        <section
          className="content-section contact-section section-wrap"
          id="contact"
        >
          <SectionHeading number="05">ESTABLISH CONNECTION</SectionHeading>

          <div className="contact-grid">
            <div className="contact-copy">
              <p className="section-kicker">OPEN CHANNEL</p>

              <h3>
                Have an idea?
                <br />
                <span>Let’s build something.</span>
              </h3>

              <p>
                Interested in collaborating, discussing projects, or
                connecting with fellow developers? Reach out through the
                links below.
              </p>

              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  GITHUB PROFILE ↗
                </a>

                <a
                  className="button button-secondary"
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  LINKEDIN ↗
                </a>
              </div>
            </div>

            <div className="contact-details">
              <div className="contact-detail">
                <span>GITHUB</span>
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  github.com/MHazeemshafi ↗
                </a>
              </div>

              <div className="contact-detail">
                <span>LINKEDIN</span>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  Mohammed Hazeem Shafi ↗
                </a>
              </div>

              <div className="contact-detail">
                <span>EMAIL</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>

              <div className="contact-detail">
                <span>AVAILABILITY</span>
                <strong>
                  <span className="status-dot" />
                  Open to opportunities
                </strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-brand" href="#home">
          ZEPHYRUS<span>.</span>
        </a>

        <p>DESIGNED &amp; BUILT BY MOHAMMED HAZEEM SHAFI</p>

        <a href="#home" className="back-to-top">
          BACK TO TOP ↑
        </a>

        <span className="footer-copyright">
          © {new Date().getFullYear()}
        </span>
      </footer>

      <div className="command-feedback" aria-live="polite">
        {activeCommand
          ? `COMMAND EXECUTED: ${activeCommand.toUpperCase()}`
          : ""}
      </div>
    </div>
  );
}

export default App;