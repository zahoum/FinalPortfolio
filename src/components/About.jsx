import React, { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './About.css';

const About = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const fullText = "I'm a Full Stack Developer passionate about building modern web applications with cutting-edge technologies. I transform complex problems into elegant, user-friendly solutions.";

  useEffect(() => {
    if (isVisible && !isTyping) {
      setDisplayText('');
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

  return (
    <section id="about" ref={ref} className={`about-section ${isVisible ? 'drop-enter-active' : 'drop-enter'}`}>
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <span className="section-badge">About Me</span>
            <h2 className="about-title">
              Who <span className="highlight">Am I?</span>
            </h2>
          </div>
          
          <div className="about-text">
            <p className="typing-text">
              {displayText}
              {isTyping && <span className="cursor">|</span>}
            </p>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="tech-stack">
            <h3 className="tech-title">Tech Stack</h3>
            <div className="tech-grid-modern">
              <div className="tech-category-modern">
                <span className="tech-cat-icon">⚛️</span>
                <span>React</span>
              </div>
              <div className="tech-category-modern">
                <span className="tech-cat-icon">💚</span>
                <span>Node.js</span>
              </div>
              <div className="tech-category-modern">
                <span className="tech-cat-icon">🐍</span>
                <span>Python</span>
              </div>
              <div className="tech-category-modern">
                <span className="tech-cat-icon">🐘</span>
                <span>PHP</span>
              </div>
              <div className="tech-category-modern">
                <span className="tech-cat-icon">🗄️</span>
                <span>MongoDB</span>
              </div>
              <div className="tech-category-modern">
                <span className="tech-cat-icon">🐬</span>
                <span>MySQL</span>
              </div>
            </div>
          </div>

          <div className="about-buttons">
            <button onClick={() => document.getElementById('hire').scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
              Hire Me ✨
            </button>
            <button className="btn btn-outline">
              <a href="" className="cv-btn">Download CV 📄</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;