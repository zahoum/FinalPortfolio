import React from 'react';
import useScrollAnimation from '../components/useScrollAnimation';

const HireMe = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section 
      id="hire" 
      ref={ref}
      className={isVisible ? 'section-enter-active' : 'section-enter'}
    >
      <div className="container">
        <h2>Hire Me</h2>
        <p>Your contact/hire content here...</p>
        <button className="hire-button">Contact Me</button>
      </div>
    </section>
  );
};

export default HireMe;