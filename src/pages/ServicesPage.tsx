import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';

const ServicesPage: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          color: darkMode ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0.3)'
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
  }, [darkMode]);

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
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      {/* Navigation Bar */}
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="block">Our</span>
                <span className="block text-red-600">Services</span>
              </h1>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                We offer comprehensive digital solutions to help your business thrive in the digital landscape.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
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
        <section className={`py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="opacity-70">
                We follow a structured approach to deliver exceptional results for every project.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative h-full">
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} relative z-10 h-full flex flex-col`}>
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Discovery</h3>
                  <p className="opacity-70">
                    We learn about your business, goals, and requirements to create a tailored strategy.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-red-600/30 -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative h-full">
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} relative z-10 h-full flex flex-col`}>
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Planning</h3>
                  <p className="opacity-70">
                    We create detailed specifications and project roadmap with clear milestones.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-red-600/30 -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative h-full">
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} relative z-10 h-full flex flex-col`}>
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Execution</h3>
                  <p className="opacity-70">
                    Our team develops your solution with regular updates and feedback sessions.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-red-600/30 -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative h-full">
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} relative z-10 h-full flex flex-col`}>
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3">Launch & Support</h3>
                  <p className="opacity-70">
                    We deploy your solution and provide ongoing maintenance and support.
                  </p>
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
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src={darkMode ? '/logo/THRYCE_black_logo.png' : '/logo/THRYCE_white_logo.png'}
                  alt="Thryce Logo"
                  className="h-8 w-auto transition-all duration-300 hover:drop-shadow-lg group-hover:brightness-110"
                />
              </Link>
              <p className="mt-2 opacity-70">Crafting digital experiences that inspire.</p>
            </div>
            <div className="flex space-x-6">
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-dribbble text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-github text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </button>
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