import React, { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './About.css';

const About = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    followers: 0,
    stars: 0
  });
  const [loading, setLoading] = useState(true);
  
  const fullText = "I'm a Full Stack Developer passionate about building modern web applications with cutting-edge technologies. I transform complex problems into elegant, user-friendly solutions.";

  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = 'zahoum';
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();
        
        if (Array.isArray(repos) && !repos.message) {
          const repoCount = repos.length;
          const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
          
          const userResponse = await fetch(`https://api.github.com/users/${username}`);
          const userData = await userResponse.json();
          const followersCount = userData.followers || 0;
          
          setGithubStats({
            repos: repoCount,
            followers: followersCount,
            stars: totalStars
          });
        } else {
          console.error('GitHub API error:', repos);
          setGithubStats({
            repos: 25,
            followers: 15,
            stars: 42
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubStats({
          repos: 25,
          followers: 15,
          stars: 42
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

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
              <span className="stat-number">
                {loading ? '...' : githubStats.repos}
              </span>
              <span className="stat-label">
                {loading ? 'Loading...' : 'Projects Completed'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {loading ? '...' : githubStats.stars}
              </span>
              <span className="stat-label">
                {loading ? 'Loading...' : '⭐ GitHub Stars'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {loading ? '...' : githubStats.followers}
              </span>
              <span className="stat-label">
                {loading ? 'Loading...' : 'GitHub Followers'}
              </span>
            </div>
          </div>

          <div className="tech-stack">
            <h3 className="tech-title">Tech Stack</h3>
            <div className="tech-marquee-container">
              <div className="tech-marquee-wrapper">
                <div className="tech-marquee-track">
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">⚛️</span>
                    <span>React</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">💚</span>
                    <span>Node.js</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐍</span>
                    <span>Python</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐘</span>
                    <span>PHP</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🗄️</span>
                    <span>MongoDB</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐬</span>
                    <span>MySQL</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">⚛️</span>
                    <span>React</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">💚</span>
                    <span>Node.js</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐍</span>
                    <span>Python</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐘</span>
                    <span>PHP</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🗄️</span>
                    <span>MongoDB</span>
                  </div>
                  <div className="tech-marquee-item">
                    <span className="tech-marquee-icon">🐬</span>
                    <span>MySQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-buttons">
            <button onClick={() => document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
              Hire Me ✨
            </button>
            <button className="btn btn-outline">
              <a href="/cv.pdf" className="cv-btn">Download CV 📄</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;