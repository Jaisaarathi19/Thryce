import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
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

  // Project data
  const projects = [
    {
      id: 1,
      title: "A College Symposium Website",
      description: "A full-featured symposium with event registration and secure checkout.",
      image: "/project_img/datalore.jpg",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://rajalakshmi.org/dataloresymposium",
      featured: true
    },
    {
      id: 2,
      title: "MONISH E - Personal Portfolio",
      description: "Modern and responsive personal portfolio website showcasing data analysis, design, and development skills with elegant UI/UX design.",
      image: "/project_img/monish-pf.png",
      category: "web",
      technologies: ["React", "TypeScript", "CSS3", "Responsive Design"],
      link: "https://monish-pf.vercel.app/",
      featured: true
    },
    {
        id: 3,
        title: "ALKET Logo Design",
        description: "Modern geometric logo design featuring clean typography and minimalist aesthetic for a technology brand.",
        image: "/logo/ALKET LOGO.png",
        category: "logo",
        technologies: ["Adobe Illustrator", "Figma", "Photoshop"],
        link: "#",
        featured: true
    },
    {
        id: 4,
        title: "Fin alch Brand Identity",
        description: "Sophisticated diamond-shaped logo design in purple gradient, representing luxury and innovation in the fintech industry.",
        image: "/logo/Fin alch-logo with BG-01.png",
        category: "logo",
        technologies: ["Adobe Illustrator", "Figma", "After Effects"],
        link: "#",
        featured: true
    },
    {
        id: 5,
        title: "EXT Business Logo",
        description: "Corporate logo design with red accent elements, combining professionalism with dynamic growth symbolism.",
        image: "/logo/EDC logo.png",
        category: "logo",
        technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
        link: "#",
        featured: true
    },
    {
        id: 6,
        title: "ARQ Minimalist Logo",
        description: "Clean and contemporary logo design emphasizing simplicity and modern architectural aesthetics.",
        image: "/logo/ARQ.png",
        category: "logo",
        technologies: ["Adobe Illustrator", "Figma", "Sketch"],
        link: "#",
        featured: true
    }
  ];

  // Filter projects by category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className={`min-h-screen font-sans ${'bg-black text-white'} transition-colors duration-500`}>
      <Navigation />
      
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      {/* Remove the duplicate header/navigation section */}
      
      <main>
        
        {/* All Projects Section - Revolutionary Design */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 mt-16 sm:mt-20">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium uppercase tracking-wide">Our Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Explore Our <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Work</span>
              </h2>
            </div>
            
            {/* Modern Category Filter */}
            <div className="flex justify-center mb-12 sm:mb-16">
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => setActiveCategory('all')} 
                    className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCategory === 'all' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <i className="fas fa-th-large"></i>
                      All Projects
                    </span>
                    {activeCategory === 'all' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveCategory('web')} 
                    className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCategory === 'web' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <i className="fas fa-code"></i>
                      Web Dev
                    </span>
                    {activeCategory === 'web' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveCategory('graphic')} 
                    className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCategory === 'graphic' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <i className="fas fa-palette"></i>
                      Graphics
                    </span>
                    {activeCategory === 'graphic' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setActiveCategory('logo')} 
                    className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCategory === 'logo' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <i className="fas fa-bullseye"></i>
                      Logos
                    </span>
                    {activeCategory === 'logo' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
                    
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating Action Button */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
                          <i className="fas fa-external-link-alt text-white text-sm"></i>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                            project.category === 'web' 
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                              : project.category === 'logo'
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          }`}>
                            {project.category === 'web' ? 'Web Dev' : project.category === 'logo' ? 'Logo' : 'Graphics'}
                          </span>
                        </div>
                      </a>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 sm:p-8">
                      {/* Decorative Line */}
                      <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4"></div>
                      
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-red-500/50 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/btn inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300 font-medium"
                      >
                        <span>Explore Project</span>
                        <i className="fas fa-arrow-right transform group-hover/btn:translate-x-1 transition-transform duration-300"></i>
                      </a>
                      
                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Empty State */}
            {filteredProjects.length === 0 && (
              <div className="max-w-md mx-auto text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-search text-white text-2xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      We couldn't find any projects matching your current filter. 
                      Try selecting a different category to explore our work.
                    </p>
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      View All Projects
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section - Revolutionary Design */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600/15 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-red-500/10 rounded-full animate-spin-slow"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              
              {/* Main CTA Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-600/10 to-red-500/20 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-700"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden">
                  
                  {/* Header Badge */}
                  <div className="text-center pt-8 sm:pt-12">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 text-sm font-medium uppercase tracking-wide">Ready to Start?</span>
                    </div>
                  </div>
                  
                  {/* Main Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
                    
                    {/* Left Content */}
                    <div className="space-y-6">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Let's Build Something
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                          Extraordinary
                        </span>
                      </h2>
                      
                      <p className="text-gray-300 text-lg leading-relaxed">
                        From concept to completion, we're here to transform your vision into a digital masterpiece. 
                        Whether it's a cutting-edge web application or stunning visual identity, let's create something amazing together.
                      </p>
                      
                      {/* Feature List */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <span className="text-gray-300">Free initial consultation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <span className="text-gray-300">Custom solutions tailored to your needs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <span className="text-gray-300">24/7 support throughout the project</span>
                        </div>
                      </div>
                      
                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link 
                          to="/contact" 
                          className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <i className="fas fa-rocket"></i>
                            Start Your Project
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </Link>
                        
                        <Link 
                          to="/about" 
                          className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-2xl font-semibold hover:border-red-500 hover:text-red-400 transition-all duration-300"
                        >
                          <span className="flex items-center gap-2">
                            <i className="fas fa-users"></i>
                            Learn More
                          </span>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Right Visual Element */}
                    <div className="relative lg:flex items-center justify-center hidden">
                      <div className="relative">
                        {/* Floating Cards */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl rotate-12 animate-float opacity-80"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl -rotate-12 animate-float delay-500 opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl rotate-45 animate-float delay-1000 opacity-70"></div>
                        
                        {/* Central Element */}
                        <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center border border-gray-700/50 shadow-2xl">
                          <div className="text-6xl text-red-500">
                            <i className="fas fa-code"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Stats Bar */}
                  <div className="border-t border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
                    <div className="grid grid-cols-2 divide-x divide-gray-700/30">
                      <div className="text-center py-6">
                        <div className="text-2xl font-bold text-red-500 mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Support Available</div>
                      </div>
                      <div className="text-center py-6">
                        <div className="text-2xl font-bold text-red-500 mb-1">100%</div>
                        <div className="text-sm text-gray-400">Client Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary CTA Cards */}
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                
                {/* Contact Card */}
                <Link to="/contact" className="group relative block">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Quick Contact</h3>
                    <p className="text-gray-400 mb-4">Drop us a message and we'll get back to you within 24 hours.</p>
                    <span className="text-red-400 hover:text-red-300 transition-colors font-medium">
                      Send Message →
                    </span>
                  </div>
                </Link>
                
                {/* Portfolio Card */}
                <Link to="/team" className="group relative block">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-users text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">View Team</h3>
                    <p className="text-gray-400 mb-4">Meet our talented team and see who makes the magic happen.</p>
                    <span className="text-red-400 hover:text-red-300 transition-colors font-medium">
                      Meet the Team →
                    </span>
                  </div>
                </Link>
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

export default ProjectsPage;
