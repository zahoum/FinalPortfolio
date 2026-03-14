import React from 'react';
import useScrollAnimation from '../components/useScrollAnimation';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section 
      id="projects" 
      ref={ref}
      className={isVisible ? 'section-enter-active' : 'section-enter'}
    >
      <div className="container">
        <h2>My Projects</h2>
        <p>Your projects content here...</p>
      </div>
    </section>
  );
};

export default Projects;