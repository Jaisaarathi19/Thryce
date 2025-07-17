import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useTheme } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          { name: 'Illustrator', max: 100 },
          { name: 'Canva', max: 100 },
          { name: 'Photoshop', max: 100 },
          { name: 'Performance', max: 100 },
          { name: 'React', max: 100 }
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
            value: [95, 85, 80, 90, 85, 90],
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

  // Remove the theme loading useEffect and toggleTheme function

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
  ];

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      {/* Use Navigation without props */}
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Creative <span className="text-red-600">Digital</span> Solutions
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-80">
              Crafting immersive digital experiences with cutting-edge technology and stunning design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95"
              >
                Get in Touch
              </Link>
              <Link 
                to="/projects" 
                className="px-8 py-3 border border-current rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              Technical <span className="text-red-600">Expertise</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <p className="text-lg mb-6">
                  With a focus on performance and user experience, We bring a comprehensive skill set to every project:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">→</span>
                    <span>React Development and Component Architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">→</span>
                    <span>Modern JavaScript and ES6+ Features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">→</span>
                    <span>Adobe Photoshop for Digital Design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">→</span>
                    <span>Adobe Illustrator for Vector Graphics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">→</span>
                    <span>Canva for Rapid Design Solutions</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-80" ref={chartRef}></div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 px-6 bg-black dark:bg-black text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              Our <span className="text-red-600">Services</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 border-2 border-gray-100 dark:border-gray-700"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mb-4">
                      <i className={`fas ${service.icon} text-lg`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="opacity-80">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              Featured <span className="text-red-600">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-lg shadow-lg h-64"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sm text-red-400 mb-1">{item.category}</span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Hero Section buttons */}
            <div className="text-center mt-12">
              <Link to="/projects" className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all duration-300 inline-block">
                View All Projects
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-20 px-6 bg-black text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90">
              Let's collaborate to create something amazing together. Reach out to discuss your ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all duration-300">
                Get in Touch
              </Link>
              <Link to="/projects" className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all duration-300">
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-12 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-2xl font-bold tracking-tighter">
                <span className="text-red-600">T</span>hryce
              </Link>
              <p className="mt-2 opacity-80 max-w-md">
                Creating digital experiences that blend creativity with technical excellence.
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </button>
              <button className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i>
              </button>
              <button className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github text-xl"></i>
              </button>
              <button className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin text-xl"></i>
              </button>
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

export default HomePage;