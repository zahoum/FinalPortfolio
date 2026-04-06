import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import HireMe from './components/HireMe';
import './App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = window.scrollY;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
      
      setShowScrollTop(scrollPx > 300);

      const sections = ['home', 'about', 'skills', 'projects', 'hire'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    const handleHashLinkClick = (e) => {
      if (e.target.hash) {
        e.preventDefault();
        const element = document.querySelector(e.target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleHashLinkClick);
    });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleHashLinkClick);
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 1500);
    }
  };

  const navItems = [
    { id: 'home', emoji: '🛖', label: 'Home' },
    { id: 'about', emoji: '🔦', label: 'About' },
    { id: 'skills', emoji: '⚡', label: 'Skills' },
    { id: 'projects', emoji: '🚀', label: 'Projects' },
    { id: 'hire', emoji: '📞', label: 'Hire Me' }
  ];

  return (
    <div className="app">
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Navbar />
      
      <main>
        <section id="home" className="hero-section">
          <div className="matrix-rain"></div>
          <div className="hero-content-wrapper">
            <div>
              <h1 className="hero-title">Welcome to My Portfolio</h1>
                <p className="hero-subtitle fade-slide-item">
                  I'm <span className="name">Zahoum</span>, A Passionate Web Developer
                </p>              
              <div className="hero-buttons">
                <button onClick={() => scrollToSection('about')} className="btn btn-primary">
                  About Me 👨‍💻
                </button>
                <button onClick={() => scrollToSection('projects')} className="btn btn-secondary">
                  View Projects 🚀
                </button>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Skills />
        <Projects />
        <HireMe />
      </main>

      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <div className="section-nav">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-dot ${activeSection === item.id ? 'active' : ''}`}
            title={item.label}
          >
            <span className="nav-emoji">{item.emoji}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>  
  );
}

export default App;