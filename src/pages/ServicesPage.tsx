import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const ServicesPage: React.FC = () => {
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

  // Services data
  const services = [
    {
      title: "Web Development",
      description: "Creating cutting-edge websites with modern JavaScript frameworks, responsive design, and advanced functionality for optimal user experience.",
      icon: "fa-code",
      image: "https://public.readdy.ai/ai/img_res/74860b45a3257f147ccb5af85bac35ad.jpg"
    },
    {
      title: "Graphic Design",
      description: "Crafting visually stunning designs, from brand identities to user interfaces, that communicate your message effectively and leave a lasting impression.",
      icon: "fa-palette",
      image: "https://public.readdy.ai/ai/img_res/c7bb7c1d96793bab45b89b0e71d510aa.jpg"
    },
    {
      title: "Logo Design",
      description: "Designing memorable and impactful logos that capture your brand's essence and make a lasting impression.",
      icon: "fa-pen-nib",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
    }
    // Add more services as needed
  ];

  return (
    <div className={`min-h-screen font-sans ${'bg-black text-white'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      {/* Navigation Bar */}
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-lg mb-4 opacity-80 max-w-2xl mx-auto">
                We offer comprehensive digital solutions to help your business thrive in the digital landscape.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${'bg-gray-800'}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4">
                      <i className={`fa ${service.icon} text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="opacity-70">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className={`py-24 ${'bg-gradient-to-b from-black to-gray-950'} relative overflow-hidden`}>
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/5 rounded-full blur-2xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                How We <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Work</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our proven methodology ensures exceptional results every time
              </p>
            </div>
            
            {/* Horizontal Process Flow - Mobile */}
            <div className="lg:hidden overflow-x-auto pb-6">
              <div className="flex space-x-6 min-w-max">
                {[
                  { number: "01", title: "Discovery", desc: "Understanding your goals and vision", icon: "fas fa-search", tags: ["Research", "Analysis"] },
                  { number: "02", title: "Design", desc: "Creating wireframes and prototypes", icon: "fas fa-drafting-compass", tags: ["UI/UX", "Prototypes"] },
                  { number: "03", title: "Development", desc: "Building robust solutions", icon: "fas fa-code", tags: ["Frontend", "Backend"] },
                  { number: "04", title: "Launch", desc: "Deploying with ongoing support", icon: "fas fa-rocket", tags: ["Deploy", "Support"] }
                ].map((step, index) => (
                  <div key={index} className="group relative flex-shrink-0 w-72">
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-500 h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                          <i className={`${step.icon} text-white text-sm`}></i>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded-full">{step.number}</span>
                          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                      <div className="flex flex-wrap gap-1">
                        {step.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Arrow for mobile */}
                    {index < 3 && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <i className="fas fa-chevron-right text-red-400 text-xs"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Horizontal Process Flow - Desktop */}
            <div className="hidden lg:block max-w-7xl mx-auto">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                
                {/* Process Steps */}
                <div className="grid grid-cols-4 gap-8">
                  {[
                    { 
                      number: "01", 
                      title: "Discovery", 
                      desc: "We start by understanding your goals, challenges, and vision through detailed research and stakeholder interviews.",
                      icon: "fas fa-search",
                      tags: ["Research", "Analysis", "Strategy"]
                    },
                    { 
                      number: "02", 
                      title: "Design", 
                      desc: "Creating wireframes, prototypes, and visual designs that bring your ideas to life with modern aesthetics.",
                      icon: "fas fa-drafting-compass",
                      tags: ["Wireframes", "Prototypes", "UI/UX"]
                    },
                    { 
                      number: "03", 
                      title: "Development", 
                      desc: "Building robust, scalable solutions using cutting-edge technologies and best practices in development.",
                      icon: "fas fa-code",
                      tags: ["Frontend", "Backend", "Testing"]
                    },
                    { 
                      number: "04", 
                      title: "Launch", 
                      desc: "Deploying your project with comprehensive testing, optimization, and ongoing support for success.",
                      icon: "fas fa-rocket",
                      tags: ["Deployment", "Optimization", "Support"]
                    }
                  ].map((step, index) => (
                    <div key={index} className="group relative" style={{ animationDelay: `${index * 150}ms` }}>
                      {/* Connection Point */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                      
                      {/* Arrow to Next Step */}
                      {index < 3 && (
                        <div className="absolute top-16 left-full w-full h-px bg-gradient-to-r from-red-500/60 to-red-500/20 transform translate-y-0.5 z-0"></div>
                      )}
                      
                      {/* Card */}
                      <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-500 mt-8 group-hover:transform group-hover:-translate-y-2">
                        {/* Icon and Number */}
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <i className={`${step.icon} text-white text-xl`}></i>
                          </div>
                        </div>
                        
                        {/* Step Number and Title */}
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-red-400 bg-red-500/10 px-3 py-1 rounded-full">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3">
                            {step.title}
                          </h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center">
                          {step.desc}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 justify-center">
                          {step.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Flow Indicator */}
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-800/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm font-medium">Start</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-60"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-40"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-20"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-1000"></div>
                  <span className="text-gray-300 text-sm font-medium">Success</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your business goals.
              </p>
              <Link to="/contact" className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all duration-300">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-12 ${'bg-gray-900'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src={'/logo/THRYCE_black_logo.png'}
                  alt="Thryce Logo"
                  className="h-8 w-auto transition-all duration-300 group-hover:brightness-110"
                />
              </Link>
              <p className="mt-2 opacity-70">Crafting digital experiences that inspire.</p>
            </div>
            <div className="flex space-x-6">
              {/* Only LinkedIn, WhatsApp, Instagram */}
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors" aria-label="WhatsApp">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
              <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70">© 2023 Thryce Studio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm opacity-70 hover:text-red-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm opacity-70 hover:text-red-600 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-sm opacity-70 hover:text-red-600 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
