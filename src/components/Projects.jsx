import React, { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './Projects.css';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const projectsPerPage = 3;

  // Fetch projects from GitHub
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const username = 'zahoum';
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`);
        const repos = await response.json();
        
        if (Array.isArray(repos) && !repos.message) {
          // Filter out forks and template repos if you want, and map to project format
          const projectList = repos
            .filter(repo => !repo.fork) // Exclude forked repositories
            .map(repo => ({
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description available',
              html_url: repo.html_url,
              homepage: repo.homepage,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
              updated_at: repo.updated_at,
              topics: repo.topics || [],
              avatar_url: repo.owner.avatar_url
            }));
          
          setProjects(projectList);
        } else {
          setError('Unable to fetch repositories. Please try again later.');
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please check your connection.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get language color
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      React: '#61dafb',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      'C++': '#f34b7d',
      'C#': '#178600',
      Go: '#00ADD8',
      Ruby: '#701516',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
      Vue: '#42b883',
      Default: '#6e7681'
    };
    return colors[language] || colors.Default;
  };

  return (
    <section id="projects" ref={ref} className={`projects-section ${isVisible ? 'section-enter-active' : 'section-enter'}`}>
      <div className="container">
        <div className="projects-header">
          <span className="section-badge">My Work</span>
          <h2 className="projects-title">
            Featured <span className="title-highlight">Projects</span>
          </h2>
          <p className="projects-subtitle">
            Here are some of my GitHub repositories that showcase my skills and passion for development
          </p>
        </div>

        {loading ? (
          <div className="projects-loading">
            <div className="loading-spinner"></div>
            <p>Fetching my projects from GitHub...</p>
          </div>
        ) : error ? (
          <div className="projects-error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-empty">
            <span className="empty-icon">📭</span>
            <p>No projects found</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {currentProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="project-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="project-card-inner">
                    <div className="project-header">
                      <div className="project-icon">
                        {project.language ? (
                          <div 
                            className="language-dot"
                            style={{ backgroundColor: getLanguageColor(project.language) }}
                          ></div>
                        ) : (
                          <span className="project-icon-emoji">📁</span>
                        )}
                      </div>
                      <div className="project-stats">
                        <span className="project-stars">
                          ⭐ {project.stars}
                        </span>
                        <span className="project-forks">
                          🍴 {project.forks}
                        </span>
                      </div>
                    </div>

                    <h3 className="project-name">{project.name}</h3>
                    
                    <p className="project-description">
                      {project.description.length > 120 
                        ? `${project.description.substring(0, 120)}...` 
                        : project.description}
                    </p>

                    {project.language && (
                      <div className="project-language">
                        <span 
                          className="language-color"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        ></span>
                        <span>{project.language}</span>
                      </div>
                    )}

                    {project.topics && project.topics.length > 0 && (
                      <div className="project-topics">
                        {project.topics.slice(0, 3).map((topic, idx) => (
                          <span key={idx} className="topic-tag">{topic}</span>
                        ))}
                      </div>
                    )}

                    <div className="project-updated">
                      Updated: {formatDate(project.updated_at)}
                    </div>

                    <div className="project-buttons">
                      <a 
                        href={project.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-github"
                      >
                        <span>🔗</span> View Code
                      </a>
                      {project.homepage && (
                        <a 
                          href={project.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-demo"
                        >
                          <span>🌐</span> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="projects-pagination">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 0}
                  className="pagination-btn"
                >
                  <span>←</span> Previous
                </button>
                
                <div className="pagination-info">
                  Page {currentPage + 1} of {totalPages}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages - 1}
                  className="pagination-btn"
                >
                  Next <span>→</span>
                </button>
              </div>
            )}

            <div className="projects-footer">
              <a 
                href="https://github.com/zahoum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-all-btn"
              >
                View All Projects on GitHub <span>→</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;