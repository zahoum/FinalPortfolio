import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [rabbitPos, setRabbitPos] = useState({ x: 0, y: 0 });
  const [isHunting, setIsHunting] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const rabbitRef = useRef(null);
  const animationRef = useRef(null);
  
  const escapeZones = [
    { x: -150, y: -150 }, { x: 150, y: -150 }, 
    { x: -150, y: 150 }, { x: 150, y: 150 },
    { x: -200, y: 0 }, { x: 200, y: 0 },
    { x: 0, y: -200 }, { x: 0, y: 200 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['about', 'skills', 'projects', 'hire'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!rabbitRef.current) return;
      
      const rabbit = rabbitRef.current.getBoundingClientRect();
      const rabbitCenter = {
        x: rabbit.left + rabbit.width / 2,
        y: rabbit.top + rabbit.height / 2
      };
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - rabbitCenter.x, 2) + 
        Math.pow(e.clientY - rabbitCenter.y, 2)
      );

      if (distance < 200) {
        setIsHunting(true);
        const randomZone = escapeZones[Math.floor(Math.random() * escapeZones.length)];
        setTargetPos(randomZone);
      } else {
        setIsHunting(false);
        setTargetPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setRabbitPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [targetPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Icônes SVG
  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z"/>
    </svg>
  );

  const MailIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <div className="logo-container">
              <span className="logo-text">ZAHOUM</span>
              <div className="ai-rabbit-container">
                <div 
                  className="ai-rabbit"
                  ref={rabbitRef}
                  style={{ transform: `translate(${rabbitPos.x}px, ${rabbitPos.y}px) scale(${isHunting ? 1.2 : 1})` }}
                >
                  🐰
                  <div className="rabbit-speech">
                    {isHunting ? "🏃💨 Catch me!" : "🤖 AI Rabbit"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-links">
            {['about', 'skills', 'projects', 'hire'].map(section => (
              <button 
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="nav-right">
          <a href="mailto:aissazahoum6@gmail.com" className="nav-email">
            <MailIcon />
            <span className="email-text">Zahoum@support.com</span>
          </a>

          <div className="social-icons">
            <a href="https://github.com/zahoum" target="_blank" rel="noopener noreferrer" className="social-icon">
              <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/zahoum-47915938a" target="_blank" rel="noopener noreferrer" className="social-icon">
              <LinkedinIcon />
            </a>
          </div>

          <ThemeToggle />
          
          <button className={`mobile-menu-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('hire')}>Hire Me</button>
          <div className="mobile-social">
            <a href="mailto:aissazahoum6@gmail.com">📧 aissazahoum6@gmail.com</a>
            <a href="https://github.com/zahoum" target="_blank">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/zahoum-47915938a" target="_blank">🔗 LinkedIn</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;