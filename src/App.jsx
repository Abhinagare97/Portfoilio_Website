import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // EmailJS configuration
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Abhishek Nagare', // Your name
    }

    try {
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )
      
      console.log('Email sent successfully:', result)
      
      // Create success notification
      const notification = document.createElement('div')
      notification.className = 'custom-notification success'
      notification.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.'
      notification.style.transform = 'translateX(0)'
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }, 4000)

      // Reset form
      setFormData({ name: '', email: '', message: '' })
      
    } catch (error) {
      console.error('Email sending failed:', error)
      
      // Create error notification
      const notification = document.createElement('div')
      notification.className = 'custom-notification error'
      notification.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or contact me directly.'
      notification.style.transform = 'translateX(0)'
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <div className="logo">Abhishek Nagare</div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}>Skills</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience') }}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
          </ul>
          <div className="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-glass-card">
            <h1 className="hero-title">Abhishek Nagare</h1>
            <p className="hero-subtitle">Full Stack Developer</p>
            <p className="hero-location">
              <i className="fas fa-map-marker-alt"></i>
              Pune, Maharashtra, India
            </p>
            <p className="hero-description">
              Dedicated and results-driven Full Stack Developer with a strong foundation in C#, .Net, Angular and React. 
              Certified in AWS Cloud Practitioner and Microsoft Azure Fundamentals (AZ-900). Passionate about 
              building efficient, scalable web applications and solving real-world problems through clean and maintainable code.
            </p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>
                <i className="fas fa-code"></i>
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
                <i className="fas fa-paper-plane"></i>
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-image-glass">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="about-content">
              <h3>Creating <span className="highlight">Amazing</span> Digital Experiences</h3>
              <p>
                I'm a dedicated Full Stack Developer with expertise in C#, .NET, React, and Angular. 
                Currently working as a Project Engineer at Wipro Ltd., I specialize in building enterprise-level applications 
                with a focus on scalable and secure solutions using modern cloud technologies.
              </p>
              <p>
                My journey began with a BE in Computer Engineering from Dr. Dy Patil Institute and continued through 
                hands-on experience at leading companies like Proazure Software Solutions and LtiMindtree. I'm passionate about 
                leveraging cutting-edge technologies to solve real-world business challenges.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">2+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Major Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Certifications</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-card-icon">
                <i className="fab fa-react"></i>
              </div>
              <h4>Frontend Development</h4>
              <p>Creating responsive and interactive user interfaces with modern frameworks and libraries.</p>
              <div className="skill-list">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Angular</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">Bootstrap</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">
                <i className="fas fa-server"></i>
              </div>
              <h4>Backend Development</h4>
              <p>Building robust server-side applications and RESTful APIs with modern technologies.</p>
              <div className="skill-list">
                <span className="skill-tag">C#</span>
                <span className="skill-tag">.NET</span>
                <span className="skill-tag">.NET Core</span>
                <span className="skill-tag">ASP.NET</span>
                <span className="skill-tag">Entity Framework</span>
                <span className="skill-tag">REST API</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">
                <i className="fas fa-database"></i>
              </div>
              <h4>Database & Cloud</h4>
              <p>Managing data with various database systems and deploying applications to cloud platforms.</p>
              <div className="skill-list">
                <span className="skill-tag">SQL Server</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">SSMS</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Azure</span>
                <span className="skill-tag">ADO.NET</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h4>Tools & Technologies</h4>
              <p>Utilizing modern development tools and workflows for efficient and collaborative development.</p>
              <div className="skill-list">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">Visual Studio</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">JWT</span>
                <span className="skill-tag">Postman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-date">Mar 2025 - Present</div>
              <h4 className="timeline-title">Project Engineer</h4>
              <div className="timeline-company">Wipro Ltd.</div>
              <div className="timeline-description">
                <p>Working on enterprise-level applications using .NET and React, focusing on scalable and secure solutions.</p>
                <ul>
                  <li>Trained on .NET, .NET Core, Entity Framework, React, Angular</li>
                  <li>Working with AWS Cloud and Azure Cloud technologies</li>
                  <li>Certified as AWS Certified Cloud Practitioner, Azure Fundamentals</li>
                  <li>Developing scalable and secure enterprise applications</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Sept 2024 - Nov 2024</div>
              <h4 className="timeline-title">Graduate Apprentice</h4>
              <div className="timeline-company">LtiMindtree</div>
              <div className="timeline-description">
                <p>Completed comprehensive training in Dotnet, including Ado.Net, Connected and Disconnected Architecture, Entity Framework and MySql.</p>
                <ul>
                  <li>Built sample applications implementing CRUD operations</li>
                  <li>Worked with database connectivity using ADO.NET and Entity Framework</li>
                  <li>Gained experience in connected and disconnected architecture</li>
                  <li>Developed proficiency in MySQL database management</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Jan 2023 - Mar 2023</div>
              <h4 className="timeline-title">Trainee Engineer (Internship)</h4>
              <div className="timeline-company">Proazure Software Solutions Pvt. Ltd.</div>
              <div className="timeline-description">
                <p>Gained valuable hands-on exposure to Web Development, Robotic Process Automation (RPA) and AWS Cloud.</p>
                <ul>
                  <li>Developed foundational skills in web development</li>
                  <li>Gained exposure to Robotic Process Automation (RPA)</li>
                  <li>Started learning AWS Cloud technologies</li>
                  <li>Participated in real-world project development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <i className="fas fa-users"></i>
              </div>
              <div className="project-content">
                <h4>Customer Management System</h4>
                <p>A comprehensive customer management system with CRUD operations, featuring JWT-based authentication and authorization for secure data management.</p>
                <div className="project-tech">
                  <span className="tech-tag">C#</span>
                  <span className="tech-tag">.NET</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">REST API</span>
                  <span className="tech-tag">JWT</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a href="#" className="project-link secondary">
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="project-content">
                <h4>Personal Finance Tracker</h4>
                <p>A secure financial management application with encryption/decryption capabilities and JWT-based authentication for managing personal financial records.</p>
                <div className="project-tech">
                  <span className="tech-tag">C#</span>
                  <span className="tech-tag">.NET</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">JWT Auth</span>
                  <span className="tech-tag">REST API</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a href="#" className="project-link secondary">
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <i className="fas fa-hand-paper"></i>
              </div>
              <div className="project-content">
                <h4>Sign Language Recognition System</h4>
                <p>Real-time ASL recognition system using computer vision and machine learning technologies for accurate sign language interpretation.</p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">OpenCV</span>
                  <span className="tech-tag">MediaPipe</span>
                  <span className="tech-tag">Random Forest</span>
                  <span className="tech-tag">ML</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a href="#" className="project-link secondary">
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Work Together</h3>
              <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development. Feel free to reach out!</p>
              
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>nagareabhishek.gss@gmail.com</span>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+91 8806159876</span>
              </div>
              
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Pune, Maharashtra, India</span>
              </div>

              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                <i className={isLoading ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2024 Abhishek Nagare. All rights reserved. Built with React and lots of ☕</p>
        </div>
      </footer>
    </>
  )
}

export default App
