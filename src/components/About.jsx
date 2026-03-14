// components/About.jsx
import React, { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './About.css';

const About = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const fullText = "I'm a Full Stack Developer passionate about building modern web applications with cutting-edge technologies. I transform complex problems into elegant, user-friendly solutions.";

  // Typing effect when section becomes visible
  useEffect(() => {
    if (isVisible && !isTyping) {
      setDisplayText(''); // Reset text
      setIsTyping(true);
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [isVisible]);

  const handleHireMe = () => {
    const hireSection = document.getElementById('hire');
    if (hireSection) {
      hireSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add highlight effect
      hireSection.classList.add('section-highlight');
      setTimeout(() => {
        hireSection.classList.remove('section-highlight');
      }, 1500);
    }
  };

  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    const cvUrl = '/path-to-your-cv.pdf';
    window.open(cvUrl, '_blank');
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className={`about-section ${isVisible ? 'drop-enter-active' : 'drop-enter'}`}
    >
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h2 className="about-title">
              About <span className="highlight">Me</span>
            </h2>
            <p className="about-subtitle">Full Stack Developer & Problem Solver</p>
          </div>
          
          <div className="about-text">
            <p className={`typing-text ${isTyping ? 'typing' : ''}`}>
              {displayText}
              {isTyping && <span className="cursor">|</span>}
            </p>
          </div>

          <div className="tech-stack">
            <h3 className="tech-title">Technologies I work with</h3>
            <div className="tech-grid">
              <div className="tech-category">
                <span className="tech-category-title">Frontend</span>
                <div className="tech-items">
                  <span className="tech-item">React</span>
                  <span className="tech-item">Next.js</span>
                  <span className="tech-item">TypeScript</span>
                  <span className="tech-item">Tailwind</span>
                </div>
              </div>
              
              <div className="tech-category">
                <span className="tech-category-title">Backend</span>
                <div className="tech-items">
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">Python</span>
                  <span className="tech-item">PHP</span>
                  <span className="tech-item">Laravel</span>
                  <span className="tech-item">Express</span>
                </div>
              </div>
              
              <div className="tech-category">
                <span className="tech-category-title">Database</span>
                <div className="tech-items">
                  <span className="tech-item">MongoDB</span>
                  <span className="tech-item">MySQL</span>
                  <span className="tech-item">PostgreSQL</span>
                  <span className="tech-item">SQL</span>
                </div>
              </div>
              
              <div className="tech-category">
                <span className="tech-category-title">Tools & Others</span>
                <div className="tech-items">
                  <span className="tech-item">Git</span>
                  <span className="tech-item">Docker</span>
                  <span className="tech-item">AWS</span>
                  <span className="tech-item">MERN</span>
                  <span className="tech-item">Jest</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-buttons">
            <button onClick={handleHireMe} className="btn btn-primary">
              <span>Hire Me</span>
              <span className="btn-icon">→</span>
            </button>
            <button onClick={handleDownloadCV} className="btn btn-secondary">
              <span>Download CV</span>
              <span className="btn-icon">📄</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;