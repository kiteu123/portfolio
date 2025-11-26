import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useState } from "react";
import "./projects.css";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "Weather App",
      description:
        "Beautiful weather application with forecast data, interactive maps, and location-based services.",
      tech: ["React", "CSS", "Fetch"],
      image:
        "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=800",
      github: "https://github.com/kiteu123/frontend/tree/main/React/weather2",
      demo: "https://weather-jet-two.vercel.app/",
    },
    {
      title: "Subway Homepage",
      description:
        "An interactive homepage with dropdown menus and dynamic routing. Clicking on a menu smoothly navigates to the corresponding section using React Router.",
      tech: ["React", "React Router", "TypeScript", "CSS"],
      image: "/image/subway.jpg",
      github: "https://github.com/kiteu123/frontend/tree/main/React/subway2",
      demo: "https://subwaytypescript.vercel.app/",
    },
    {
      title: "Web Sample",
      description:
        "A simple company introduction website showcasing services and team information. Built with HTML, CSS, and JavaScript for a clean and responsive layout.",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
      image: "image/websample.png",
      github: "https://github.com/kiteu123/my-website",
      demo: "https://my-website-coral-sigma.vercel.app/",
    },
    {
      title: "Todo List App",
      description:
        "A modern Todo application allowing task creation, completion tracking, and easy management. Built with React for interactive and dynamic use.",
      tech: ["React", "React Hook", "JSX/HTML", "JS/ES6"],
      image: "image/todolist.png",
      github: "https://github.com",
      demo: "https://todolistsample.vercel.app/",
    },
    {
      title: "Animated Web Sample",
      description:
        "Responsive portfolio website with animations, dark mode, and modern UI/UX design.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      image: "image/Tea.gif",
      github: "https://github.com/kiteu123/frontend/tree/main/React/nasmedia",
      demo: "https://animatedweb-nine.vercel.app/",
    },
    // {
    //   title: "Chat Application",
    //   description:
    //     "Real-time chat application with rooms, file sharing, emoji support, and message history.",
    //   tech: ["Socket.io", "Node.js", "React"],
    //   image:
    //     "https://images.unsplash.com/photo-1586999768265-24af89630739?w=800",
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
  ];
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My <span className="highlight">Projects</span>
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            A collection of my recent work showcasing my skills and experience
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay"></div>
                {/* hover overlay */}
                {hoveredIndex === index && (
                  <div className="project-hover-overlay">
                    <a
                      href={project.github}
                      target="_blank"
                      className="project-link"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      className="project-link"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                )}
              </div>
              {/* content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {/* Tech stack */}
                <div className="project-tech">
                  {project.tech.map((t, tIndex) => (
                    <span key={tIndex} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
