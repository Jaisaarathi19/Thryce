import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

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
          color: '#ffffff',
          fontSize: 12
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(50, 50, 50, 0.3)', 'rgba(50, 50, 50, 0.2)', 'rgba(50, 50, 50, 0.1)', 'rgba(50, 50, 50, 0.05)']
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
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
              color: 'rgba(255, 0, 0, 0.6)'
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
  }, []);

  // Theme loading effect

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
    <div className="min-h-screen font-sans bg-black text-white transition-colors duration-500">
      
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      {/* Use Navigation without props */}
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
          {/* Enhanced background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-red-950/20"></div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border border-red-500 rotate-45 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border border-red-400 rotate-12 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-red-600 rotate-90 animate-pulse delay-2000"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="animate-fadeInUp">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Creative <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse">Digital</span> Solutions
              </h1>
              <div className="relative mb-10">
                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 text-gray-200 leading-relaxed">
                  Crafting immersive digital experiences with cutting-edge technology and stunning design that transforms ideas into reality.
                </p>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <Link 
                  to="/contact" 
                  className="group relative px-10 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] active:scale-95"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/projects" 
                  className="group relative px-10 py-4 border-2 border-red-500 text-white rounded-full font-semibold overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95 hover:bg-red-500/10"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
          {/* Modern scroll indicator: double chevron with glow and subtle pulse */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center select-none">
            <span className="relative flex flex-col items-center">
              <span className="block animate-bounce">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#chevronGlow)">
                    <polyline points="12,16 18,24 24,16" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12,8 18,16 24,8" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                  </g>
                  <defs>
                    <filter id="chevronGlow" x="-10" y="-10" width="56" height="56" filterUnits="userSpaceOnUse">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </span>
              <span className="block w-2 h-2 mt-1 rounded-full bg-red-500 shadow-[0_0_12px_4px_rgba(239,68,68,0.5)] animate-pulse"></span>
            </span>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We offer comprehensive digital solutions that transform your vision into reality
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Card background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Floating icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-red-400/30 group-hover:scale-110 transition-transform duration-300">
                      <i className={`fas ${service.icon} text-lg`}></i>
                    </div>
                  </div>
                  
                  <div className="p-8 relative">
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/50 to-gray-900/30"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1)_0%,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Featured <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover our latest work and creative solutions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl h-80 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Image container */}
                  <div className="relative h-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        <span className="inline-block px-3 py-1 bg-red-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-3 border border-red-400/50">
                          {item.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        {/* Action button */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <button className="inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors duration-300">
                            View Project 
                            <i className="fas fa-arrow-right ml-2 text-sm transform group-hover:translate-x-1 transition-transform duration-300"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA button */}
            <div className="text-center mt-16">
              <Link 
                to="/projects" 
                className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
              >
                <span className="relative z-10">View All Projects</span>
                <i className="fas fa-arrow-right ml-3 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-red-500 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-400 rotate-12 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Ready to start your project?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Let's collaborate to create something amazing together. Transform your vision into a digital masterpiece that captivates and converts.
              </p>
              
              {/* Enhanced CTA buttons */}
              <div className="flex flex-wrap justify-center gap-8">
                <Link 
                  to="/contact" 
                  className="group relative px-12 py-5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(239,68,68,0.8)]"
                >
                  <span className="relative z-10 flex items-center">
                    Get in Touch
                    <i className="fas fa-rocket ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  to="/projects" 
                  className="group relative px-12 py-5 border-2 border-red-500 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:bg-red-500/10"
                >
                  <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                    View Projects
                    <i className="fas fa-eye ml-3 transform group-hover:scale-110 transition-transform duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              </div>
              
              {/* Statistics or additional info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
                <div className="group text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-500">
                  <div className="text-3xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Projects Completed</div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-500">
                  <div className="text-3xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Support Available</div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-500">
                  <div className="text-3xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">Client Satisfaction</div>
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

export default HomePage;