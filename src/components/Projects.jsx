import React from 'react';
import useScrollAnimation from './useScrollAnimation';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section 
      id="projects" 
      ref={ref}
      className={isVisible ? 'section-enter-active' : 'section-enter'}
    >
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
          My Projects 🚀
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Your projects content here...
        </p>
      </div>
    </section>
  );
};

export default Projects;