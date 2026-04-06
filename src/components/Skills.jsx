import React, { useState } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './Skills.css';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🎯' },
    { id: 'frontend', name: 'Frontend', icon: '💻' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'tools', name: 'Tools', icon: '🛠️' }
  ];

  const skills = [
    { name: 'React', level: 90, category: 'frontend', icon: '⚛️', color: '#61DAFB' },
    { name: 'JavaScript', level: 85, category: 'frontend', icon: '💛', color: '#F7DF1E' },
    { name: 'TypeScript', level: 80, category: 'frontend', icon: '🔷', color: '#3178C6' },
    { name: 'HTML/CSS', level: 92, category: 'frontend', icon: '🌐', color: '#E34F26' },
    { name: 'Node.js', level: 85, category: 'backend', icon: '💚', color: '#68A063' },
    { name: 'Python', level: 80, category: 'backend', icon: '🐍', color: '#3776AB' },
    { name: 'PHP', level: 75, category: 'backend', icon: '🐘', color: '#777BB4' },
    { name: 'Express', level: 75, category: 'backend', icon: '🚂', color: '#000000' },
    { name: 'MongoDB', level: 75, category: 'database', icon: '🍃', color: '#47A248' },
    { name: 'MySQL', level: 85, category: 'database', icon: '🐬', color: '#4479A1' },
    { name: 'Git', level: 90, category: 'tools', icon: '📦', color: '#F05032' },
    { name: 'Docker', level: 70, category: 'tools', icon: '🐳', color: '#2496ED' },
    { name: 'Figma', level: 75, category: 'tools', icon: '🎨', color: '#F24E1E' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" ref={ref} className={`skills-section ${isVisible ? 'section-enter-active' : 'section-enter'}`}>
      <div className="container">
        <div className="skills-header">
          <span className="section-badge">My Skills</span>
          <h2 className="skills-title">
            What I <span className="title-highlight">Bring to the Table</span>
          </h2>
        </div>

        <div className="skills-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="skills-grid-modern">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card-modern" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="skill-icon-modern" style={{ backgroundColor: `${skill.color}20` }}>
                <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
              </div>
              <div className="skill-info-modern">
                <h4>{skill.name}</h4>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                </div>
                <span className="skill-percent">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;