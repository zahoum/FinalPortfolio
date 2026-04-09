import React, { useState } from 'react';
import useScrollAnimation from './useScrollAnimation';
import './HireMe.css';

const HireMe = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    loading: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: true, loading: true, success: false, message: '' });

    try {
      // Using FormSubmit.co
      const response = await fetch('https://formsubmit.co/ajax/aissazahoum6@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          _subject: `New Hire Request from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus({
          submitted: true,
          loading: false,
          success: true,
          message: '✅ Thank you! Your message has been sent successfully. I will get back to you within 24 hours.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
          timeline: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, submitted: false }));
        }, 5000);
      } else {
        throw new Error('Failed to send');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        submitted: true,
        loading: false,
        success: false,
        message: '❌ Something went wrong. Please try again or contact me directly via email.'
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }
  };

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'E-commerce',
    'Portfolio Website',
    'API Development',
    'Database Design',
    'UI/UX Design',
    'Maintenance & Support',
    'Other'
  ];

  return (
    <section id="hire" ref={ref} className={`hire-section ${isVisible ? 'section-enter-active' : 'section-enter'}`}>
      <div className="container">
        <div className="hire-content">
          <div className="hire-header">
            <span className="section-badge">Hire Me</span>
            <h2 className="hire-title">
              Let's Work <span className="title-highlight">Together</span>
            </h2>
            <p className="hire-subtitle">
              Have a project in mind? Let's bring your ideas to life. Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <div className="hire-grid">
            <div className="hire-info">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email Me</h3>
                <a href="mailto:aissazahoum6@gmail.com">Zahoum</a>
              </div>
              <div className="info-card">
                <div className="info-icon">📱</div>
                <h3>Call Me</h3>
                <a href="tel:+212649339948">+212 649339948</a>
              </div>
              <div className="info-card">
                <div className="info-icon">💬</div>
                <h3>Response Time</h3>
                <p>Within 48 hours</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🌍</div>
                <h3>Available For</h3>
                <p>Remote & Freelance dev</p>
              </div>
              <div className="info-card">
                <div className="info-icon">⏰</div>
                <h3>Working Hours</h3>
                <p>Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>

            <form className="hire-form" onSubmit={handleSubmit}>
              {status.submitted && (
                <div className={`form-message ${status.success ? 'success' : 'error'}`}>
                  {status.message}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="YourEmail@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+212 XXX XXXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="$500 - $1,000">$500 - $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">Expected Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP (1-2 weeks)">ASAP (1-2 weeks)</option>
                  <option value="Within a month (3-4 weeks)">Within a month (3-4 weeks)</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="3+ months">3+ months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project, requirements, and goals. The more details, the better I can understand your needs!"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    📤 Send Message
                  </>
                )}
              </button>

              <p className="form-note">
                🔒 Your information is safe and will only be used to contact you about your project.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;