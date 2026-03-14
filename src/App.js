import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import HireMe from './components/HireMe';
import './App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll progress, show/hide scroll to top button, and active section
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = window.scrollY;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
      
      // Show scroll to top button after scrolling 300px
      setShowScrollTop(scrollPx > 300);

      // Update active section based on scroll position
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
    
    // Handle hash links for smooth scrolling
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

    // Add click event listeners to all hash links
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

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add highlight effect
      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 1500);
    }
  };

  // Navigation items with emojis
  const navItems = [
    { id: 'home', emoji: '🛖', label: 'Home' },
    { id: 'about', emoji: '🔦', label: 'About' },
    { id: 'skills', emoji: '⚡', label: 'Skills' },
    { id: 'projects', emoji: '🚀', label: 'Projects' },
    { id: 'hire', emoji: '📞', label: 'Hire Me' }
  ];

  return (
    <div className="app">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Navbar />
      
      <main>
        {/* Hero Section with Sequential Animation */}
<section id="home" className="hero-section">
  <div className="matrix-rain">
    {/* You can add canvas matrix effect here if desired */}
  </div>
  <div className="hero-content-wrapper">
    <div className="container">
      <h1 className="hero-title fade-slide-item">Welcome to My Portfolio</h1>
      <p className="hero-subtitle fade-slide-item">I'm Zahoum, A Passionate Web Developer</p>
      
      <div className="hero-buttons fade-slide-item">
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

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* Floating Section Navigation with Emojis */}
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