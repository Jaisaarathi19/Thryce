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
        <section className="py-4">
          <div className="container mx-auto px-6">
            {/* Send Me a Message Form */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="relative">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-800/20 rounded-3xl blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent rounded-3xl"></div>
                
                <div className={`relative p-8 md:p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-700 transform hover:scale-[1.01]`}>
                  {/* Header Section */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 mb-6">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-red-400 text-sm font-medium">Ready to collaborate</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                      <span className="text-white">Send Me a </span>
                      <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Message</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                      Let's discuss your project and bring your vision to life
                    </p>
                  </div>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mr-4 border border-green-500/30">
                        <i className="fa fa-check text-green-400"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-green-300 mb-1">Message Sent Successfully!</h3>
                        <p className="text-green-400/80 text-sm">I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {submitError && (
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center mr-4 border border-red-500/30">
                        <i className="fa fa-exclamation-triangle text-red-400"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-red-300 mb-1">Message Failed</h3>
                        <p className="text-red-400/80 text-sm">Something went wrong. Please try again or contact me directly.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-300 group-focus-within:text-red-400 transition-colors">
                        <i className="fas fa-user mr-2 text-red-500"></i>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="relative w-full px-6 py-4 rounded-2xl bg-gray-800/50 border-2 border-gray-700/50 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-gray-800/70"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-300 group-focus-within:text-red-400 transition-colors">
                        <i className="fas fa-envelope mr-2 text-red-500"></i>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="relative w-full px-6 py-4 rounded-2xl bg-gray-800/50 border-2 border-gray-700/50 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-gray-800/70"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  {/* Subject */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-3 text-gray-300 group-focus-within:text-red-400 transition-colors">
                      <i className="fas fa-tag mr-2 text-red-500"></i>
                      Project Type
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="relative w-full px-6 py-4 rounded-2xl bg-gray-800/50 border-2 border-gray-700/50 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-gray-800/70"
                      placeholder="Web Development, UI/UX Design, Branding..."
                    />
                  </div>
                  
                  {/* Message */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-300 group-focus-within:text-red-400 transition-colors">
                      <i className="fas fa-comment-dots mr-2 text-red-500"></i>
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="relative w-full px-6 py-4 rounded-2xl bg-gray-800/50 border-2 border-gray-700/50 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 resize-none text-white placeholder-gray-500 backdrop-blur-sm hover:bg-gray-800/70"
                      placeholder="Tell me about your project goals, timeline, budget, and any specific requirements. The more details you provide, the better I can help you achieve your vision."
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-red-500/25'}`}
                    >
                      {/* Button Background Effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Button Content */}
                      <div className="relative px-8 py-4 rounded-2xl transition-all duration-300 transform group-hover:scale-[1.02]">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center text-white font-bold text-lg">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            <span>Sending Your Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-white font-bold text-lg">
                            <i className="fas fa-paper-plane mr-3 transform group-hover:translate-x-1 transition-transform"></i>
                            <span>Send Message</span>
                            <div className="ml-3 w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                  
                  {/* Footer Info */}
                  <div className="pt-6 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-shield-alt text-red-500"></i>
                        <span>Your data is secure</span>
                      </div>
                      <div className="w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-clock text-red-500"></i>
                        <span>24hr response time</span>
                      </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
            
            {/* Contact Information and Let's Connect - Horizontal Layout */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="relative order-1 lg:order-1">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/15 via-transparent to-red-800/15 rounded-3xl blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/3 to-transparent rounded-3xl"></div>
                  
                  <div className={`relative p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 transition-all duration-700 transform hover:scale-[1.01] h-full`}>
                    {/* Header Section */}
                    <div className="text-center mb-6 md:mb-8">
                      <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 mb-3 sm:mb-4">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-red-400 text-xs sm:text-sm font-medium">Direct contact</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3">
                        <span className="text-white">Contact </span>
                        <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Information</span>
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base px-2">
                        Multiple ways to reach out and start our collaboration
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {/* Email */}
                      <div className="group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/20 group-hover:border-red-400/50 transition-all duration-300">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-red-500/30 to-red-600/30 flex items-center justify-center border border-red-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fa fa-envelope text-base sm:text-lg text-red-300"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm sm:text-base text-red-200 group-hover:text-red-100 transition-colors mb-0.5 sm:mb-1">Email Address</h3>
                              <a href="mailto:hellothryce@gmail.com" className="text-red-400/90 hover:text-red-300 transition-colors text-xs sm:text-sm truncate block">hellothryce@gmail.com</a>
                            </div>
                            <div className="text-red-400 group-hover:text-red-300 transition-colors transform group-hover:translate-x-1 duration-300">
                              <i className="fas fa-external-link-alt text-sm sm:text-base"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/20 group-hover:border-green-400/50 transition-all duration-300">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/30 flex items-center justify-center border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fa fa-phone text-base sm:text-lg text-green-300"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm sm:text-base text-green-200 group-hover:text-green-100 transition-colors mb-1 sm:mb-2">Phone Numbers</h3>
                              <div className="space-y-0.5 sm:space-y-1">
                                <div><a href="tel:+917358281869" className="text-green-400/90 hover:text-green-300 transition-colors text-xs sm:text-sm block">+91 73582 81869</a></div>
                                <div><a href="tel:+917358208027" className="text-green-400/90 hover:text-green-300 transition-colors text-xs sm:text-sm block">+91 73582 08027</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-500/20 group-hover:border-blue-400/50 transition-all duration-300">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fa fa-map-marker-alt text-base sm:text-lg text-blue-300"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm sm:text-base text-blue-200 group-hover:text-blue-100 transition-colors mb-0.5 sm:mb-1">Location</h3>
                              <div className="text-blue-400/90 text-xs sm:text-sm">
                                <p>Ambattur, Chennai</p>
                                <p>Tamil Nadu, India</p>
                              </div>
                            </div>
                            <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                              <i className="fas fa-globe text-sm sm:text-base"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Let's Connect */}
                <div className="relative order-2 lg:order-2">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-pink-800/15 rounded-3xl blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/3 to-transparent rounded-3xl"></div>
                  
                  <div className={`relative p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-700 transform hover:scale-[1.01] h-full`}>
                    {/* Header Section */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-red-400 text-sm font-medium">Social Networks</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black mb-3">
                        <span className="text-white">Let's </span>
                        <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Connect</span>
                      </h2>
                      <p className="text-gray-400 text-base">
                        Follow my journey and connect on your preferred platform
                      </p>
                    </div>
                  
                    <div className="space-y-5">
                      {/* LinkedIn */}
                      <a 
                        href="https://linkedin.com/in/your-profile" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative overflow-hidden block"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-500/20 group-hover:border-blue-400/50 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fab fa-linkedin text-xl text-blue-300"></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-base text-blue-200 group-hover:text-blue-100 transition-colors">LinkedIn</h3>
                              <p className="text-sm text-blue-300/80 group-hover:text-blue-200/90 transition-colors">Professional networking & career updates</p>
                            </div>
                            <div className="text-blue-400 group-hover:text-blue-300 transition-colors transform group-hover:translate-x-1 duration-300">
                              <i className="fas fa-arrow-right text-base"></i>
                            </div>
                          </div>
                        </div>
                      </a>

                      {/* WhatsApp */}
                      <a 
                        href="https://wa.me/917358281869" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative overflow-hidden block"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/30 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/20 group-hover:border-green-400/50 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/30 flex items-center justify-center border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fab fa-whatsapp text-xl text-green-300"></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-base text-green-200 group-hover:text-green-100 transition-colors">WhatsApp</h3>
                              <p className="text-sm text-green-300/80 group-hover:text-green-200/90 transition-colors">Quick messages & instant communication</p>
                            </div>
                            <div className="text-green-400 group-hover:text-green-300 transition-colors transform group-hover:translate-x-1 duration-300">
                              <i className="fas fa-arrow-right text-base"></i>
                            </div>
                          </div>
                        </div>
                      </a>

                      {/* Instagram */}
                      <a 
                        href="https://instagram.com/your-profile" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative overflow-hidden block"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-orange-600/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-orange-600/10 border border-pink-500/20 group-hover:border-pink-400/50 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-orange-500/30 flex items-center justify-center border border-pink-400/30 group-hover:scale-110 transition-transform duration-300">
                              <i className="fab fa-instagram text-xl text-pink-300"></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-base text-pink-200 group-hover:text-pink-100 transition-colors">Instagram</h3>
                              <p className="text-sm text-pink-300/80 group-hover:text-pink-200/90 transition-colors">Behind the scenes & creative showcase</p>
                            </div>
                            <div className="text-pink-400 group-hover:text-pink-300 transition-colors transform group-hover:translate-x-1 duration-300">
                              <i className="fas fa-arrow-right text-base"></i>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Response Time Info */}
                    <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30">
                      <div className="flex items-center justify-center space-x-4 text-center">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-clock text-red-500"></i>
                          <span className="text-sm text-gray-300 font-medium">Typically responds within 24 hours</span>
                        </div>
                        <div className="w-px h-4 bg-gray-600"></div>
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-shield-alt text-red-500"></i>
                          <span className="text-sm text-gray-300 font-medium">Your privacy is protected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className={`py-20 bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm`}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
                Frequently Asked<span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"> Questions</span>
              </h2>
              
              <div className="space-y-6">
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 shadow-2xl hover:shadow-red-500/10 hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 border border-gray-700/50 hover:border-red-500/30 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        What <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">services</span> do you offer?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-300">
                        We specialize in web development, UI/UX design, and interactive experiences. This includes custom website development, web applications, graphic design, logo design, and brand identity design.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 shadow-2xl hover:shadow-red-500/10 hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 border border-gray-700/50 hover:border-red-500/30 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        What is your typical project <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">timeline</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-300">
                        Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while more complex web applications can take 2-3 months. We'll provide a detailed timeline during our initial consultation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 shadow-2xl hover:shadow-red-500/10 hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 border border-gray-700/50 hover:border-red-500/30 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        How do you handle project <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">pricing</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-300">
                        We offer both fixed-price and hourly rate options depending on the project requirements. For most client projects, I prefer a fixed-price approach with clear deliverables and milestones.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 shadow-2xl hover:shadow-red-500/10 hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 border border-gray-700/50 hover:border-red-500/30 backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300">
                        Do you offer ongoing <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">maintenance</span>?
                      </h3>
                      <i className="fas fa-chevron-down text-red-500 transform group-hover:rotate-180 transition-transform duration-300"></i>
                    </div>
                    <div className="mt-3 overflow-hidden transition-all duration-300">
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-300">
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
      <footer className="py-12 px-6 bg-gray-900">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0">
                    <Link to="/" className="flex items-center space-x-3 group">
                      <img 
                        src='/logo/THRYCE_black_logo.png'
                        alt="Thryce Logo"
                        className="h-8 w-auto transition-all duration-300 group-hover:brightness-110"
                      />
                    </Link>
                    <p className="mt-2 opacity-80 max-w-md">
                      Creating digital experiences that blend creativity with technical excellence.
                    </p>
                  </div>
                  <div className="flex space-x-6">
                    {/* Only LinkedIn, WhatsApp, Instagram */}
                    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                      <span className="sr-only">LinkedIn</span>
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                      <span className="sr-only">WhatsApp</span>
                      <i className="fab fa-whatsapp text-xl"></i>
                    </a>
                    <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                      <span className="sr-only">Instagram</span>
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                  <p className="opacity-60 text-sm">
                    © {new Date().getFullYear()} Thryce. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
    </div>
  );
};

export default ContactPage;
