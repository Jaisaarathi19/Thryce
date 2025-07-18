import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Particles animation
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: 'rgba(255, 0, 0, 0.5)'
        });
      }
    };
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      }
      requestAnimationFrame(animateParticles);
    };
    createParticles();
    animateParticles();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme loading effect
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    
    try {
      // Initialize EmailJS (important step)
      emailjs.init('o6oQrktFhE6mbqGz0'); // Your public key
      
      // Using EmailJS with your service ID - Updated to match your template
      const templateParams = {
        name: formData.name,             // Matches {{name}} in your template
        email: formData.email,           // For reply functionality
        message: formData.message,       // Matches {{message}} in your template
        time: new Date().toLocaleString(), // Matches {{time}} in your template
        subject: formData.subject,       // Additional info
        reply_to: formData.email,        // For email replies
      };
      
      console.log('Sending email with params:', templateParams);
      
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_gw1pvwz', // Your service ID
        'template_hvx3pc4', // ⚠️ UPDATE THIS: Replace with your actual template ID from EmailJS dashboard
        templateParams
      );
      
      console.log('Email sent successfully:', result);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error: any) {
      console.error('Detailed error submitting form:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      
      // More detailed error handling
      if (error.status === 400) {
        console.error('❌ 400 Error: Check your template variables in EmailJS dashboard');
        console.error('Make sure your template uses: {{name}}, {{message}}, {{time}}');
      } else if (error.status === 401) {
        console.error('❌ 401 Error: Invalid public key or service ID');
      } else if (error.status === 404) {
        console.error('❌ 404 Error: Template or service not found');
      } else if (error.text && error.text.includes('Invalid public key')) {
        console.error('❌ Invalid public key. Please check your EmailJS public key.');
      } else if (error.text && error.text.includes('Invalid service ID')) {
        console.error('❌ Invalid service ID. Please check your EmailJS service ID.');
      } else if (error.text && error.text.includes('Invalid template ID')) {
        console.error('❌ Invalid template ID. Please check your EmailJS template ID.');
      }
      
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
      
      // Reset success/error messages after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitError(false);
      }, 5000);
    }
  };

  return (
    <div className={`min-h-screen font-sans bg-black text-white transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      {/* Use Navigation without props */}
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Get in<span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"> Touch</span>
              </h2>
              <p className="text-lg mb-4 opacity-80 max-w-2xl mx-auto">
                Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form below or reach out through one of my social channels.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className={`p-8 rounded-xl shadow-lg bg-gray-800/50`}>
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500 text-green-500">
                    <p className="flex items-center">
                      <i className="fa fa-check-circle mr-2"></i>
                      Your message has been sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-500">
                    <p className="flex items-center">
                      <i className="fa fa-exclamation-circle mr-2"></i>
                      There was an error sending your message. Please try again.
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-colors`}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-colors`}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-colors`}
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-colors resize-none`}
                      placeholder="Tell me about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600/50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <i className="fa fa-circle-notch fa-spin mr-2"></i>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <div className={`p-8 rounded-xl shadow-lg mb-8 bg-gray-800/50`}>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa fa-envelope text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <a href="mailto:hello@thryce.com" className="text-red-600 hover:underline">hello@thryce.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa fa-phone text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <a href="tel:+91 9789096777" className="text-red-600 hover:underline">+91 9789096777</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa fa-map-marker-alt text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p>Ambattur, Chennai</p>
                        <p>India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-8 rounded-xl shadow-lg bg-gray-800/50`}>
                  <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="https://linkedin.com/in/your-profile" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-4 rounded-lg flex items-center bg-gray-700 hover:bg-gray-600 transition-colors`}
                    >
                      <i className="fab fa-linkedin text-xl mr-3"></i>
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://wa.me/your-whatsapp-number" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-4 rounded-lg flex items-center bg-gray-700 hover:bg-gray-600 transition-colors`}
                    >
                      <i className="fab fa-whatsapp text-xl mr-3"></i>
                      <span>WhatsApp</span>
                    </a>
                    <a 
                      href="https://instagram.com/your-profile" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-4 rounded-lg flex items-center bg-gray-700 hover:bg-gray-600 transition-colors`}
                    >
                      <i className="fab fa-instagram text-xl mr-3"></i>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className={`py-20 bg-gray-900/50`}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
                Frequently Asked<span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"> Questions</span>
              </h2>
              
              <div className="space-y-6">
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-700/80 transition-all duration-300 border border-transparent hover:border-red-500/30`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        What <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">services</span> do you offer?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        We specialize in web development, UI/UX design, and interactive experiences. This includes custom website development, web applications, graphic design, logo design, and brand identity design.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-700/80 transition-all duration-300 border border-transparent hover:border-red-500/30`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        What is your typical project <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">timeline</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while more complex web applications can take 2-3 months. We'll provide a detailed timeline during our initial consultation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-700/80 transition-all duration-300 border border-transparent hover:border-red-500/30`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        How do you handle project <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">pricing</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        We offer both fixed-price and hourly rate options depending on the project requirements. For most client projects, I prefer a fixed-price approach with clear deliverables and milestones.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-700/80 transition-all duration-300 border border-transparent hover:border-red-500/30`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        Do you offer ongoing <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">maintenance</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        Yes, We offer website maintenance and support packages to keep your site secure, updated, and performing optimally. These can be tailored to your specific needs and budget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-12 bg-gray-900`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src={'/logo/THRYCE_black_logo.png'}
                  alt="Thryce Logo"
                  className="h-8 w-auto transition-all duration-300 hover:drop-shadow-lg group-hover:brightness-110"
                />
              </Link>
              <p className="mt-2 opacity-70">Crafting digital experiences that inspire.</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://twitter.com/your-profile" className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://instagram.com/your-profile" className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://dribbble.com/your-profile" className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-dribbble text-xl"></i>
              </a>
              <a href="https://github.com/your-profile" className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://linkedin.com/in/your-profile" className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70">© 2023 Thryce Studio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-sm opacity-70 hover:text-red-600 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-sm opacity-70 hover:text-red-600 transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-sm opacity-70 hover:text-red-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
