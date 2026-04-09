import React from 'react';
import useScrollAnimation from './useScrollAnimation';

const HireMe = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section 
      id="hire" 
      ref={ref}
      className={isVisible ? 'section-enter-active' : 'section-enter'}
    >
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
          Hire Me 📞
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          +212 649339948
        </p>
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HireMe;