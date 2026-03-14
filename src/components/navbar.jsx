import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
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
  const logoRef = useRef(null);
  const animationRef = useRef(null);
  
  // نقاط هروب متعددة
  const escapeZones = [
    { x: -150, y: -150 }, { x: 150, y: -150 }, 
    { x: -150, y: 150 }, { x: 150, y: 150 },
    { x: -200, y: 0 }, { x: 200, y: 0 },
    { x: 0, y: -200 }, { x: 0, y: 200 },
    { x: -100, y: -100 }, { x: 100, y: 100 },
    { x: -100, y: 100 }, { x: 100, y: -100 }
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

  // AI Rabbit محسن - حركة سلسة
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!rabbitRef.current) return;
      
      const rabbit = rabbitRef.current.getBoundingClientRect();
      const rabbitCenter = {
        x: rabbit.left + rabbit.width / 2,
        y: rabbit.top + rabbit.height / 2
      };
      
      // حساب المسافة
      const distance = Math.sqrt(
        Math.pow(e.clientX - rabbitCenter.x, 2) + 
        Math.pow(e.clientY - rabbitCenter.y, 2)
      );

      // منطقة الخطر
      if (distance < 200) {
        setIsHunting(true);
        
        // حساب اتجاه الهروب
        const angle = Math.atan2(rabbitCenter.y - e.clientY, rabbitCenter.x - e.clientX);
        
        // اختيار نقطة هروب عشوائية
        const randomZone = escapeZones[Math.floor(Math.random() * escapeZones.length)];
        
        // مسافة الهروب حسب قرب العدو
        const runSpeed = distance < 100 ? 250 : 150;
        
        // حساب الهدف الجديد
        const newTarget = {
          x: randomZone.x + (Math.cos(angle) * runSpeed),
          y: randomZone.y + (Math.sin(angle) * runSpeed)
        };
        
        setTargetPos(newTarget);
        
        // إذا كان العدو قريب جداً، هروب سريع
        if (distance < 80) {
          setRabbitPos({
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300
          });
        }
      } else {
        setIsHunting(false);
        setTargetPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation سلسة للـ rabbit
  useEffect(() => {
    const animate = () => {
      if (rabbitRef.current) {
        // Smooth interpolation
        setRabbitPos(prev => ({
          x: prev.x + (targetPos.x - prev.x) * 0.15,
          y: prev.y + (targetPos.y - prev.y) * 0.15
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Zahoum AI Rabbit - ليسار */}
        <div className="nav-left">
          <div 
            className="nav-logo" 
            onClick={() => scrollToSection('home')}
            ref={logoRef}
          >
            <div className="logo-container">
              <span className="logo-text">ZAHOUM</span>
              <div className="ai-rabbit-container">
                <div 
                  className="ai-rabbit"
                  ref={rabbitRef}
                  style={{
                    transform: `translate(${rabbitPos.x}px, ${rabbitPos.y}px) scale(${isHunting ? 1.2 : 1})`,
                  }}
                >
                  🐰
                  <span className="rabbit-ears">
                    <span className="ear"></span>
                    <span className="ear"></span>
                  </span>
                  <div className="ai-glitch"></div>
                </div>
                <div className="rabbit-speech">
                  {isHunting ? "🏃💨 Catch me if you can!" : "🤖 AI Rabbit Online"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links - الوسط */}
        <div className="nav-center">
          <div className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>
            <button 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button 
              className={`nav-link ${activeSection === 'hire' ? 'active' : ''}`}
              onClick={() => scrollToSection('hire')}
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Right section - Email, Social, Dark Mode */}
        <div className="nav-right">
          <a href="mailto:aissazahoum6@gmail.com" className="nav-email">
            <Mail size={20} />
            <span className="email-text">Zahoum@support.com</span>
          </a>

          <div className="social-icons">
            <a href="https://github.com/zahoum" target="_blank" rel="noopener noreferrer" title="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/zahoum-47915938a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>

          <ThemeToggle />
          
          <button 
            className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('hire')}>Hire Me</button>
          <div className="mobile-social">
            <a href="mailto:aissazahoum6@gmail.com"><Mail size={18} /> aissazahoum6@gmail.com</a>
            <a href="https://github.com/zahoum" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>
            <a href="https://www.linkedin.com/in/zahoum-47915938a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;