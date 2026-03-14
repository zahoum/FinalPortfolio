import React, { useState } from 'react';
import useScrollAnimation from '../components/useScrollAnimation';
import './Skills.css';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detailed'

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: '🌟', color: '#ff4d4d' },
    { id: 'frontend', name: 'Frontend', icon: '💻', color: '#61DAFB' },
    { id: 'backend', name: 'Backend', icon: '⚙️', color: '#68A063' },
    { id: 'database', name: 'Database', icon: '🗄️', color: '#F29111' },
    { id: 'tools', name: 'Tools', icon: '🛠️', color: '#A97BFF' }
  ];

  const skillsData = [
    // Frontend
    { id: 1, name: 'React', level: 90, icon: '⚛️', category: 'frontend', color: '#61DAFB', experience: '1 year', projects: 2, description: 'Building interactive UIs with React hooks, context, and Redux' },
    { id: 2, name: 'JavaScript', level: 85, icon: '💛', category: 'frontend', color: '#F7DF1E', experience: '2 years', projects: 5, description: 'ES6+, async programming, DOM manipulation' },
    { id: 3, name: 'TypeScript', level: 80, icon: '🔷', category: 'frontend', color: '#3178C6', experience: '2 years', projects: 6, description: 'Type safety, interfaces, generics, and advanced types' },
    { id: 4, name: 'HTML5', level: 95, icon: '🌐', category: 'frontend', color: '#E34F26', experience: '3 years', projects: 10, description: 'Semantic HTML, accessibility, SEO optimization' },
    { id: 5, name: 'CSS3', level: 90, icon: '🎨', category: 'frontend', color: '#1572B6', experience: '3 years', projects: 8, description: 'Flexbox, Grid, animations, responsive design' },
    { id: 8, name: 'Vue.js', level: 70, icon: '🟢', category: 'frontend', color: '#4FC08D', experience: '2 years', projects: 6, description: 'Vue 3, composition API, Vuex' },
    
    // Backend
    { id: 9, name: 'Node.js', level: 85, icon: '💚', category: 'backend', color: '#68A063', experience: '2 years', projects: 8, description: 'REST APIs, Express, middleware, file handling' },
    { id: 10, name: 'Python', level: 80, icon: '🐍', category: 'backend', color: '#3776AB', experience: '3 years', projects: 2, description: 'Django, Flask, data processing, automation' },
    { id: 11, name: 'Express', level: 75, icon: '🚂', category: 'backend', color: '#000000', experience: '1 years', projects: 3, description: 'Routing, middleware, error handling' },
    { id: 13, name: 'PHP', level: 75, icon: '🐘', category: 'backend', color: '#777BB4', experience: '3 years', projects: 10, description: 'Laravel, WordPress development' },
    { id: 14, name: 'Laravel', level: 70, icon: '⚡', category: 'backend', color: '#FF2D20', experience: '1 years', projects: 3, description: 'Eloquent, blade templates, artisan' },
    { id: 16, name: 'REST API', level: 90, icon: '🔌', category: 'backend', color: '#25D366', experience: '2 years', projects: 11, description: 'API design, documentation, versioning' },
    
    // Database
    { id: 17, name: 'MongoDB', level: 75, icon: '🍃', category: 'database', color: '#47A248', experience: '1 years', projects: 12, description: 'Aggregation, indexing, mongoose' },
    { id: 19, name: 'MySQL', level: 85, icon: '🐬', category: 'database', color: '#4479A1', experience: '3 years', projects: 18, description: 'Database design, stored procedures' },
    
    // Tools
    { id: 23, name: 'Git', level: 90, icon: '📦', category: 'tools', color: '#F05032', experience: '3 years', projects: 30, description: 'Version control, branching, merging' },
    { id: 24, name: 'Docker', level: 70, icon: '🐳', category: 'tools', color: '#2496ED', experience: '2 years', projects: 8, description: 'Containerization, docker-compose' },
    { id: 25, name: 'VS Code', level: 95, icon: '💻', category: 'tools', color: '#007ACC', experience: '3 years', projects: 104, description: 'Extensions, debugging, customization' },
    { id: 26, name: 'Figma', level: 75, icon: '🎯', category: 'tools', color: '#F24E1E', experience: '3 years', projects: 12, description: 'UI/UX design, prototyping' },
    { id: 29, name: 'GitHub Actions', level: 70, icon: '⚙️', category: 'tools', color: '#2088FF', experience: '2 years', projects: 7, description: 'CI/CD pipelines, automation' },
    { id: 30, name: 'AWS', level: 40, icon: '☁️', category: 'tools', color: '#FF9900', experience: '2 years', projects: 5, description: 'EC2, S3, Lambda, deployment' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const getCategoryStats = (categoryId) => {
    if (categoryId === 'all') {
      return {
        count: skillsData.length,
        avgLevel: Math.round(skillsData.reduce((acc, s) => acc + s.level, 0) / skillsData.length),
        totalProjects: skillsData.reduce((acc, s) => acc + s.projects, 0)
      };
    }
    const catSkills = skillsData.filter(s => s.category === categoryId);
    return {
      count: catSkills.length,
      avgLevel: Math.round(catSkills.reduce((acc, s) => acc + s.level, 0) / catSkills.length),
      totalProjects: catSkills.reduce((acc, s) => acc + s.projects, 0)
    };
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className={`skills-section ${isVisible ? 'section-enter-active' : 'section-enter'}`}
    >
      {/* Animated Background */}
      <div className="skills-bg">
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
      </div>

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <h2 className="skills-title">
            Technical <span className="title-highlight">Expertise</span>
            <span className="title-emoji">⚡</span>
          </h2>
          <p className="skills-subtitle">
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filters">
          {skillCategories.map(cat => {
            const stats = getCategoryStats(cat.id);
            return (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ '--cat-color': cat.color }}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span className="filter-name">{cat.name}</span>
                <span className="filter-count">{stats.count}</span>
              </button>
            );
          })}
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="toggle-icon">🔲</span>
            Grid View
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'detailed' ? 'active' : ''}`}
            onClick={() => setViewMode('detailed')}
          >
            <span className="toggle-icon">📊</span>
            Detailed View
          </button>
        </div>

        {/* Skills Display */}
        {viewMode === 'grid' ? (
          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.id} 
                className="skill-card"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="skill-card-inner">
                  <div className="skill-card-front">
                    <div className="skill-icon-wrapper" style={{ backgroundColor: `${skill.color}20` }}>
                      <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
                    </div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-level-badge" style={{ backgroundColor: skill.color }}>
                      {skill.level}%
                    </div>
                  </div>
                  <div className="skill-card-back" style={{ backgroundColor: skill.color }}>
                    <div className="back-content">
                      <span className="back-emoji">{skill.icon}</span>
                      <h4>{skill.name}</h4>
                      <p className="back-experience">⭐ {skill.experience}</p>
                      <p className="back-projects">📁 {skill.projects} projects</p>
                      <button className="view-details-btn" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSkill(skill);
                      }}>
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills-detailed">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.id} 
                className="detailed-skill-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="detailed-skill-header">
                  <div className="detailed-skill-info">
                    <span className="detailed-icon" style={{ color: skill.color }}>{skill.icon}</span>
                    <div className="detailed-skill-meta">
                      <h4 className="detailed-skill-name">{skill.name}</h4>
                      <span className="detailed-category" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="detailed-percentage">{skill.level}%</span>
                </div>
                
                <div className="detailed-progress-container">
                  <div className="detailed-progress-bar">
                    <div 
                      className="detailed-progress-fill"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        backgroundColor: skill.color
                      }}
                    >
                      <div className="progress-glow"></div>
                    </div>
                  </div>
                  
                  <div className="detailed-stats">
                    <span className="stat-chip">
                      <span className="chip-icon">⏱️</span>
                      {skill.experience}
                    </span>
                    <span className="stat-chip">
                      <span className="chip-icon">📋</span>
                      {skill.projects} projects
                    </span>
                  </div>
                  
                  <p className="detailed-description">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skill Details Modal */}
        {selectedSkill && (
          <div className="skill-modal" onClick={() => setSelectedSkill(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedSkill(null)}>×</button>
              
              <div className="modal-header" style={{ backgroundColor: `${selectedSkill.color}15` }}>
                <span className="modal-icon" style={{ color: selectedSkill.color }}>{selectedSkill.icon}</span>
                <h3 className="modal-title">{selectedSkill.name}</h3>
                <span className="modal-badge" style={{ backgroundColor: selectedSkill.color }}>
                  Level {selectedSkill.level}%
                </span>
              </div>
              
              <div className="modal-body">
                <p className="modal-description">{selectedSkill.description}</p>
                
                <div className="modal-details-grid">
                  <div className="modal-detail-item">
                    <span className="detail-label">Experience</span>
                    <span className="detail-value">{selectedSkill.experience}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Projects</span>
                    <span className="detail-value">{selectedSkill.projects} completed</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value" style={{ color: selectedSkill.color }}>
                      {skillCategories.find(c => c.id === selectedSkill.category)?.name}
                    </span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Proficiency</span>
                    <span className="detail-value">{selectedSkill.level}%</span>
                  </div>
                </div>

                <div className="modal-progress">
                  <div className="modal-progress-bar">
                    <div 
                      className="modal-progress-fill"
                      style={{ 
                        width: `${selectedSkill.level}%`,
                        backgroundColor: selectedSkill.color
                      }}
                    ></div>
                  </div>
                </div>

                <div className="modal-projects">
                  <h4>Recent Projects with {selectedSkill.name}</h4>
                  <ul className="project-list">
                    <li>E-commerce Platform</li>
                    <li>Admin Dashboard</li>
                    <li>API Integration</li>
                    <li>Real-time Application</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;