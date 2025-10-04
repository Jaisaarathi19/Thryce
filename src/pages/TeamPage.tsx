import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

// Optimized Image Component for better loading performance
const OptimizedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <i className="fas fa-user text-2xl mb-2"></i>
            <p className="text-sm">{alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const TeamPage: React.FC = () => {
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

  // Team members data
  const teamMembers = [
    {
      name: "Monish",
      role: "Designer",
      bio: "Creative designer with expertise in UI/UX design, branding, and visual storytelling.",
      image: "/images/monish.jpeg",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Abhijit",
      role: "Developer",
      bio: "Full-stack developer specializing in modern web technologies and scalable applications.",
      image: "/images/abhijit.jpg",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Jai Saarathi",
      role: "Developer",
      bio: "Backend specialist with strong focus on system architecture and performance optimization.",
      image: "/images/saarathi.jpg",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Joel Sam",
      role: "Designer",
      bio: "Innovative designer passionate about creating engaging user experiences and interfaces.",
      image: "/images/joel.jpg",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "Faleel Mohsin",
      role: "Developer",
      bio: "Frontend developer with expertise in creating responsive and interactive web applications.",
      image: "/images/faleel.jpg",
      social: {
        linkedin: "#",
        instagram: "#"
      }
    }
  ];

  // Update the grid layout in the Team Section
  return (
    <div className={`min-h-screen font-sans ${'bg-black text-white'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      {/* Navigation Bar */}
      <Navigation />
      <main>
        {/* Hero Section and rest of the page content follows... */}
        <section className="relative min-h-[40vh] flex items-center justify-center pt-20 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-red-500 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-400 rotate-12 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-500/20 rounded-full animate-float"></div>
          </div>
          
          <div className="container mx-auto px-6 py-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                Meet Our <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Team</span>
              </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                We're a group of passionate professionals dedicated to creating exceptional digital experiences and innovative solutions.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section - Ultra Responsive */}
        <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Professional Team Grid */}
            <div className="max-w-7xl mx-auto">
              {/* First 3 members - Ultra Responsive Grid */}
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center mb-12 sm:mb-16">
                  {teamMembers.slice(0, 3).map((member, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                    >
                      {/* Enhanced Image Container */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px] overflow-hidden bg-gray-800">
                          <OptimizedImage 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-center filter brightness-85 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating Social Links */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200">
                            {member.social.linkedin && (
                              <button 
                                onClick={() => window.open(member.social.linkedin, '_blank')}
                                className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10"
                                aria-label={`${member.name}'s LinkedIn`}
                              >
                                <i className="fab fa-linkedin-in text-sm"></i>
                              </button>
                            )}
                            {member.social.instagram && (
                              <button 
                                onClick={() => window.open(member.social.instagram, '_blank')}
                                className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10"
                                aria-label={`${member.name}'s Instagram`}
                              >
                                <i className="fab fa-instagram text-sm"></i>
                              </button>
                            )}
                          </div>
                          
                          {/* Role Badge */}
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wide rounded-full border border-red-400/50">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Content Section */}
                      <div className="p-8 relative">
                        {/* Decorative Element */}
                        <div className="absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 transform -translate-y-1"></div>
                        
                        <div className="pt-2">
                          {/* Name */}
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                            {member.name}
                          </h3>
                          
                          {/* Role */}
                          <p className="text-red-500 font-semibold mb-4 uppercase tracking-wider text-sm">
                            {member.role}
                          </p>
                          
                          {/* Bio */}
                          <p className="text-gray-300 leading-relaxed text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">
                            {member.bio}
                          </p>
                          
                          {/* Skills/Expertise Tags */}
                          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-300">
                            {member.role === 'Designer' && (
                              <>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">UI/UX</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Branding</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Visual Design</span>
                              </>
                            )}
                            {member.role === 'Developer' && (
                              <>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">React</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Node.js</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">TypeScript</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Bottom Accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Last 2 members - Ultra Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center max-w-5xl mx-auto">
                  {teamMembers.slice(3, 5).map((member, index) => (
                    <div 
                      key={index + 3} 
                      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                    >
                      {/* Enhanced Image Container */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px] overflow-hidden bg-gray-800">
                          <OptimizedImage 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-center filter brightness-85 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating Social Links */}
                          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200">
                            {member.social.linkedin && (
                              <button 
                                onClick={() => window.open(member.social.linkedin, '_blank')}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10"
                                aria-label={`${member.name}'s LinkedIn`}
                              >
                                <i className="fab fa-linkedin-in text-xs sm:text-sm"></i>
                              </button>
                            )}
                            {member.social.instagram && (
                              <button 
                                onClick={() => window.open(member.social.instagram, '_blank')}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10"
                                aria-label={`${member.name}'s Instagram`}
                              >
                                <i className="fab fa-instagram text-xs sm:text-sm"></i>
                              </button>
                            )}
                          </div>
                          
                          {/* Role Badge */}
                          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wide rounded-full border border-red-400/50">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Content Section */}
                      <div className="p-4 sm:p-6 md:p-8 relative">
                        {/* Decorative Element */}
                        <div className="absolute top-0 left-4 sm:left-6 md:left-8 w-8 sm:w-10 md:w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 transform -translate-y-1"></div>
                        
                        <div className="pt-2">
                          {/* Name */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-400 transition-colors duration-300">
                            {member.name}
                          </h3>
                          
                          {/* Role */}
                          <p className="text-red-500 font-semibold mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider text-xs sm:text-sm">
                            {member.role}
                          </p>
                          
                          {/* Bio */}
                          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6 group-hover:text-gray-200 transition-colors duration-300">
                            {member.bio}
                          </p>
                          
                          {/* Skills/Expertise Tags */}
                          <div className="flex flex-wrap gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-300">
                            {member.role === 'Designer' && (
                              <>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">UI/UX</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Branding</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Visual Design</span>
                              </>
                            )}
                            {member.role === 'Developer' && (
                              <>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">React</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">Node.js</span>
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">TypeScript</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Bottom Accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Team Stats - Revolutionary Design */}
            <div className="mt-16 sm:mt-20 lg:mt-24 relative">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-red-500 rounded-full filter blur-2xl animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-600 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
              </div>
              
              {/* Stats Container */}
              <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm font-medium uppercase tracking-wide">By The Numbers</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Our <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Impact</span>
                  </h3>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  
                  {/* Team Members Stat */}
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 h-[280px] flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25 flex-shrink-0">
                        <i className="fas fa-users text-white text-xl"></i>
                      </div>
                      
                      {/* Number */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex-shrink-0">
                        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">5</span>
                        <span className="text-red-500">+</span>
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-medium mb-2 group-hover:text-white transition-colors duration-300 flex-shrink-0">Team Members</div>
                      
                      {/* Description */}
                      <div className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-grow">
                        Passionate professionals driving innovation
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Projects Stat */}
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 h-[280px] flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25 flex-shrink-0">
                        <i className="fas fa-rocket text-white text-xl"></i>
                      </div>
                      
                      {/* Number */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex-shrink-0">
                        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">5</span>
                        <span className="text-red-500">+</span>
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-medium mb-2 group-hover:text-white transition-colors duration-300 flex-shrink-0">Projects</div>
                      
                      {/* Description */}
                      <div className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-grow">
                        Successful launches and counting
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left delay-200"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Experience Stat */}
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 h-[280px] flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25 flex-shrink-0">
                        <i className="fas fa-calendar-alt text-white text-xl"></i>
                      </div>
                      
                      {/* Number */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex-shrink-0">
                        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">2</span>
                        <span className="text-red-500">+</span>
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-medium mb-2 group-hover:text-white transition-colors duration-300 flex-shrink-0">Years Experience</div>
                      
                      {/* Description */}
                      <div className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-grow">
                        Proven track record of excellence
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left delay-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Satisfaction Stat */}
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 h-[280px] flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25 flex-shrink-0">
                        <i className="fas fa-heart text-white text-xl"></i>
                      </div>
                      
                      {/* Number */}
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex-shrink-0">
                        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">100</span>
                        <span className="text-red-500">%</span>
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-medium mb-2 group-hover:text-white transition-colors duration-300 flex-shrink-0">Satisfaction</div>
                      
                      {/* Description */}
                      <div className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-grow">
                        Client happiness is our priority
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left delay-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Achievement Banner */}
                <div className="mt-12 sm:mt-16 relative">
                  <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-trophy text-red-500 text-xl"></i>
                        <span className="text-red-400 font-semibold uppercase tracking-wide">Achievement Unlocked</span>
                      </div>
                      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
                    </div>
                    <p className="text-gray-300 text-lg sm:text-xl">
                      Every number tells a story of <span className="text-red-400 font-semibold">dedication</span>, 
                      <span className="text-red-400 font-semibold"> innovation</span>, and 
                      <span className="text-red-400 font-semibold"> client success</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section - Innovative Design */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium uppercase tracking-wide">Our Core Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                What Drives <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Excellence</span>
              </h2>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                These principles aren't just words on a wall—they're the beating heart of everything we create and every relationship we build.
              </p>
            </div>
            
            {/* Values Grid - Modern Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
              
              {/* Innovation Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25">
                      <i className="fas fa-rocket text-white text-2xl sm:text-3xl"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    Innovation
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    We don't just follow trends—we create them. Every pixel, every line of code, every user interaction is an opportunity to push boundaries and redefine what's possible.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                  </div>
                </div>
              </div>
              
              {/* Collaboration Card */}
              <div className="group relative lg:mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25">
                      <i className="fas fa-users text-white text-2xl sm:text-3xl"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping delay-200"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    Collaboration
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    Great minds think differently, and that's our superpower. We bring together diverse perspectives, skills, and ideas to create solutions that no single person could imagine.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left delay-200"></div>
                  </div>
                </div>
              </div>
              
              {/* Excellence Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-500/25">
                      <i className="fas fa-crown text-white text-2xl sm:text-3xl"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping delay-500"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    Excellence
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    Good enough isn't in our vocabulary. We obsess over details, refine until perfect, and deliver experiences that don't just meet expectations—they shatter them.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Quote Section */}
            <div className="mt-16 sm:mt-20 lg:mt-24 max-w-4xl mx-auto text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent rounded-2xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8 lg:p-12">
                  <div className="text-4xl sm:text-5xl text-red-500 mb-4 opacity-20">"</div>
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-6">
                    These values aren't just our foundation—
                    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-semibold"> they're our promise</span> to every client, every project, and every dream we help bring to life.
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
                    <span className="text-red-400 font-medium">The Thryce Team</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Our Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Join Our<span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our growing team. Check out our open positions.
              </p>
              <Link to="/contact" className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all duration-300">
                Get in Touch
              </Link>
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
                                  src='/logo/THRYCE_black_logo.svg'
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
                                <a href="https://www.linkedin.com/company/thryce-official/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                                  <span className="sr-only">LinkedIn</span>
                                  <i className="fab fa-linkedin text-xl"></i>
                                </a>
                                <a href="https://wa.me/917358281869" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
                                  <span className="sr-only">WhatsApp</span>
                                  <i className="fab fa-whatsapp text-xl"></i>
                                </a>
                                <a href="https://www.instagram.com/thryce_digital" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1">
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
                
                export default TeamPage;
