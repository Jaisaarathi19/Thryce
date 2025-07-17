// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

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

  // Skills chart
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = {
      animation: false,
      radar: {
        indicator: [
          { name: 'JavaScript', max: 100 },
          { name: 'React', max: 100 },
          { name: 'UI/UX', max: 100 },
          { name: 'Animation', max: 100 },
          { name: 'Three.js', max: 100 },
          { name: 'Performance', max: 100 }
        ],
        radius: '65%',
        splitNumber: 5,
        scale: true,
        axisName: {
          color: darkMode ? '#ffffff' : '#333333',
          fontSize: 12
        },
        splitArea: {
          areaStyle: {
            color: darkMode ?
              ['rgba(50, 50, 50, 0.3)', 'rgba(50, 50, 50, 0.2)', 'rgba(50, 50, 50, 0.1)', 'rgba(50, 50, 50, 0.05)'] :
              ['rgba(250, 250, 250, 0.5)', 'rgba(250, 250, 250, 0.3)', 'rgba(250, 250, 250, 0.2)', 'rgba(250, 250, 250, 0.1)']
          }
        },
        axisLine: {
          lineStyle: {
            color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      series: [{
        name: 'Skills',
        type: 'radar',
        data: [
          {
            value: [95, 90, 85, 92, 80, 88],
            name: 'Skill Level',
            areaStyle: {
              color: darkMode ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 0, 0, 0.4)'
            },
            lineStyle: {
              width: 2,
              color: 'rgba(255, 0, 0, 0.8)'
            }
          }
        ]
      }]
    };
    chart.setOption(option);
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [darkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Services data
  const services = [
    {
      title: "Web Development",
      description: "Creating cutting-edge websites with modern JavaScript frameworks and advanced animations.",
      icon: "fa-code",
      image: "https://public.readdy.ai/ai/img_res/74860b45a3257f147ccb5af85bac35ad.jpg"
    },
    {
      title: "UI/UX Design",
      description: "Crafting intuitive and visually stunning interfaces that engage users and elevate brands.",
      icon: "fa-palette",
      image: "https://public.readdy.ai/ai/img_res/c7bb7c1d96793bab45b89b0e71d510aa.jpg"
    },
    {
      title: "Animation",
      description: "Bringing websites to life with fluid animations, transitions, and interactive elements.",
      icon: "fa-film",
      image: "https://public.readdy.ai/ai/img_res/70c3d96f1a211699ba7c58a03254e07d.jpg"
    },
    {
      title: "Custom Builds",
      description: "Developing tailor-made solutions for unique business needs with scalable architecture.",
      icon: "fa-tools",
      image: "https://public.readdy.ai/ai/img_res/51a5f12751bb1f7d8f588707d1e14b3a.jpg"
    }
  ];

  // Portfolio data
  const portfolioItems = [
    {
      title: "Nebula Finance",
      category: "Web App",
      image: "https://public.readdy.ai/ai/img_res/8cb119b4aecf2ae918eb9d0235d93cdb.jpg"
    },
    {
      title: "Pulse E-commerce",
      category: "UI/UX Design",
      image: "https://public.readdy.ai/ai/img_res/a3025f7ec52b1ecac8875c31968035e1.jpg"
    },
    {
      title: "Synth Music Platform",
      category: "Web Development",
      image: "https://public.readdy.ai/ai/img_res/9b1b3fce70292547562aea5df91c1152.jpg"
    },
    {
      title: "Quantum Portfolio",
      category: "Animation",
      image: "https://public.readdy.ai/ai/img_res/a296dd01dd447b379c14368feeef36fa.jpg"
    },
    {
      title: "Vertex Agency",
      category: "Custom Build",
      image: "https://public.readdy.ai/ai/img_res/f4b96f1e2cb3879df781a23d76fac0aa.jpg"
    },
    {
      title: "Echo Social Network",
      category: "Web App",
      image: "https://public.readdy.ai/ai/img_res/6f976edbeb4903d17431fe44a487f6a0.jpg"
    }
  ];

  // Team data
  const teamMembers = [
    {
      name: "Thryce",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 8+ years of experience creating cutting-edge web experiences.",
      image: "https://public.readdy.ai/ai/img_res/6d074c80fe2493449d0dd44ae44b85f5.jpg"
    },
    {
      name: "Alex Chen",
      role: "UI/UX Designer",
      bio: "Award-winning designer specializing in intuitive interfaces and brand identity systems.",
      image: "https://public.readdy.ai/ai/img_res/727f42b17fae627b25a5313d1f7d168c.jpg"
    },
    {
      name: "Marcus Reed",
      role: "Animation Specialist",
      bio: "Motion graphics expert with a background in film and interactive media.",
      image: "https://public.readdy.ai/ai/img_res/a08f645b455f2c8655a1ad27538e420a.jpg"
    },
    {
      name: "Sophia Wright",
      role: "Project Manager",
      bio: "Certified project manager with expertise in agile methodologies and client relations.",
      image: "https://public.readdy.ai/ai/img_res/9519a358bef5d8ce413d98744b95bd2b.jpg"
    }
  ];

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? 'bg-black/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} transition-colors duration-500`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold tracking-tighter">
                <span className="text-red-600">T</span>hryce
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Portfolio</button>
              <button onClick={() => scrollToSection('team')} className="text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Team</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Contact</button>
              <button onClick={toggleTheme} className="ml-4 p-2 rounded-full bg-gray-800/20 hover:bg-gray-800/30 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                <i className={`fa ${darkMode ? 'fa-sun' : 'fa-moon'} text-red-600`}></i>
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleTheme} className="mr-4 p-2 rounded-full bg-gray-800/20 hover:bg-gray-800/30 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                <i className={`fa ${darkMode ? 'fa-sun' : 'fa-moon'} text-red-600`}></i>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-red-600 text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'} overflow-hidden transition-all duration-500 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('home')} className="py-2 text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Home</button>
            <button onClick={() => scrollToSection('services')} className="py-2 text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="py-2 text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Portfolio</button>
            <button onClick={() => scrollToSection('team')} className="py-2 text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Team</button>
            <button onClick={() => scrollToSection('contact')} className="py-2 text-sm uppercase tracking-wider hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">Contact</button>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-12 flex flex-col items-center text-center">
            <div className="max-w-2xl z-10">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="block">Crafting Digital</span>
                <span className="block text-red-600">Experiences</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-80">
                I build advanced websites and applications with cutting-edge technology and stunning animations that elevate your brand.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => scrollToSection('portfolio')} className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer !rounded-button whitespace-nowrap">
                  View My Work
                </button>
                <button onClick={() => scrollToSection('contact')} className={`px-8 py-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors shadow-lg hover:shadow-xl cursor-pointer !rounded-button whitespace-nowrap`}>
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer`} onClick={() => scrollToSection('services')}>
            <i className="fa fa-chevron-down text-red-600"></i>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className={`py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
              <p className="max-w-2xl mx-auto opacity-70">
                I offer comprehensive web development solutions with a focus on performance, aesthetics, and user experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${darkMode ? 'bg-gray-800 hover:bg-gray-800/80' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl transform hover:-translate-y-2`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
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
            <div className="mt-20">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">My Skills & Expertise</h3>
                    <p className="mb-6 opacity-70">
                      With expertise in modern web technologies and design principles, I create seamless digital experiences that stand out.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <i className="fa fa-check text-red-600 mr-2"></i>
                        <span>Modern JavaScript Frameworks (React, Vue, Angular)</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fa fa-check text-red-600 mr-2"></i>
                        <span>Advanced CSS & Animation Techniques</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fa fa-check text-red-600 mr-2"></i>
                        <span>Responsive & Mobile-First Design</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fa fa-check text-red-600 mr-2"></i>
                        <span>Performance Optimization & SEO</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fa fa-check text-red-600 mr-2"></i>
                        <span>3D Web Experiences with Three.js</span>
                      </li>
                    </ul>
                  </div>
                  <div className="h-80" ref={chartRef}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="max-w-2xl mx-auto opacity-70">
                Explore a selection of my recent work showcasing web development, UI/UX design, and animation expertise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider text-red-600">{item.category}</span>
                    <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-sm font-medium hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap">View Details</button>
                      <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <i className="fa fa-arrow-right text-red-600 group-hover:text-white transition-colors"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                View All Projects
              </button>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section id="team" className={`py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
              <p className="max-w-2xl mx-auto opacity-70">
                A talented group of professionals dedicated to creating exceptional digital experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-red-600 text-sm mb-3">{member.role}</p>
                    <p className="text-sm opacity-70">{member.bio}</p>
                    <div className="mt-4 flex space-x-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-twitter text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-linkedin-in text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-github text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing Together</h2>
                  <p className="mb-8 opacity-70">
                    Have a project in mind? I'd love to hear about it. Get in touch and let's create something extraordinary.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                        <i className="fa fa-envelope text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="opacity-70">hello@thryce.dev</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                        <i className="fa fa-phone text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-bold">Phone</h3>
                        <p className="opacity-70">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                        <i className="fa fa-map-marker-alt text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-bold">Location</h3>
                        <p className="opacity-70">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-bold mb-4">Connect With Me</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-twitter text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-linkedin-in text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-github text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                        <i className="fab fa-dribbble text-gray-600 hover:text-white transition-colors"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={`rounded-xl shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                  <form>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-red-600 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-red-600 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-red-600 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        placeholder="Project Inquiry"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-red-600 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg cursor-pointer !rounded-button whitespace-nowrap">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <a href="#" className="text-2xl font-bold tracking-tighter">
                <span className="text-red-600">T</span>hryce
              </a>
              <p className="mt-4 max-w-md opacity-70">
                Crafting exceptional digital experiences with cutting-edge technology and stunning design. Let's build something amazing together.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="fab fa-twitter text-gray-600 hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="fab fa-linkedin-in text-gray-600 hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="fab fa-github text-gray-600 hover:text-white transition-colors"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="fab fa-dribbble text-gray-600 hover:text-white transition-colors"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-red-600 transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-red-600 transition-colors cursor-pointer">Services</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-red-600 transition-colors cursor-pointer">Portfolio</button></li>
                <li><button onClick={() => scrollToSection('team')} className="hover:text-red-600 transition-colors cursor-pointer">Team</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-red-600 transition-colors cursor-pointer">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Web Development</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors cursor-pointer">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Animation</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Custom Builds</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Consulting</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm opacity-70">© 2025 Thryce. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <button onClick={toggleTheme} className="mr-4 text-sm hover:text-red-600 transition-colors cursor-pointer">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button onClick={scrollToTop} className="text-sm hover:text-red-600 transition-colors cursor-pointer">
                  Back to Top <i className="fa fa-arrow-up ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

