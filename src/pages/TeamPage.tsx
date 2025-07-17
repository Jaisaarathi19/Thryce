import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';

const TeamPage: React.FC = () => {
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

  // Team members data
  const teamMembers = [
    {
      name: "Monish",
      role: "Designer",
      bio: "Creative designer with expertise in UI/UX design, branding, and visual storytelling.",
      image: "/images/Monish.png",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      name: "Abhijit",
      role: "Developer",
      bio: "Full-stack developer specializing in modern web technologies and scalable applications.",
      image: "/images/abhijit.jpeg",
      social: {
        linkedin: "#",
        github: "#",
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
        github: "#",
        instagram: "#"
      }
    },
    {
      name: "Joel Sam",
      role: "Designer",
      bio: "Innovative designer passionate about creating engaging user experiences and interfaces.",
      image: "https://public.readdy.ai/ai/img_res/a296dd01dd447b379c14368feeef36fa.jpg",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    },
    {
      name: "Faleel Mohsin",
      role: "Developer",
      bio: "Frontend developer with expertise in creating responsive and interactive web applications.",
      image: "/images/faleel.jpeg",
      social: {
        linkedin: "#",
        github: "#",
        instagram: "#"
      }
    }
  ];

  // Update the grid layout in the Team Section
  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 rounded-full border-2 border-red-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"></div>
      {/* Particles background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
      {/* Navigation Bar */}
      <Navigation />
      <main>
      {/* Hero Section and rest of the page content follows... */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="block">Meet Our</span>
                <span className="block text-red-600">Team</span>
              </h1>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                We're a group of passionate professionals dedicated to creating exceptional digital experiences.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* First row - 3 members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {teamMembers.slice(0, 3).map((member, index) => (
                <div 
                  key={index} 
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-red-600 mb-3">{member.role}</p>
                    <p className="opacity-70 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => window.open(member.social.linkedin, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </button>
                      <button 
                        onClick={() => window.open(member.social.github, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <i className="fab fa-github"></i>
                      </button>
                      <button 
                        onClick={() => window.open(member.social.instagram, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s Instagram`}
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Second row - 2 members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.slice(3, 5).map((member, index) => (
                <div 
                  key={index + 3} 
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-red-600 mb-3">{member.role}</p>
                    <p className="opacity-70 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => window.open(member.social.linkedin, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </button>
                      <button 
                        onClick={() => window.open(member.social.github, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <i className="fab fa-github"></i>
                      </button>
                      <button 
                        onClick={() => window.open(member.social.instagram, '_blank')}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`${member.name}'s Instagram`}
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className={`py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="opacity-70">
                These core principles guide our work and define our culture.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-6">
                  <i className="fa fa-lightbulb text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="opacity-70">
                  We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that exceed expectations.
                </p>
              </div>
              
              <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-6">
                  <i className="fa fa-users text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Collaboration</h3>
                <p className="opacity-70">
                  We believe in the power of teamwork and open communication to create solutions that truly matter.
                </p>
              </div>
              
              <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-6">
                  <i className="fa fa-heart text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="opacity-70">
                  We are committed to delivering the highest quality in everything we do, from code to customer service.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Our Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
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
                <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="mb-6 md:mb-0">
                        <Link to="/" className="text-2xl font-bold tracking-tighter">
                          <span className="text-red-600">T</span>hryce
                        </Link>
                        <p className="mt-2 opacity-70">Crafting digital experiences that inspire.</p>
                      </div>
                      <div className="flex space-x-6">
                        <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Twitter">
                          <i className="fab fa-twitter text-xl"></i>
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Instagram">
                          <i className="fab fa-instagram text-xl"></i>
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Dribbble">
                          <i className="fab fa-dribbble text-xl"></i>
                        </button>
                        <div className="flex space-x-6">
                          <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in text-xl"></i>
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="GitHub">
                            <i className="fab fa-github text-xl"></i>
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Instagram">
                            <i className="fab fa-instagram text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-800/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                      <p className="text-sm opacity-70">© 2025 Thryce Studio. All rights reserved.</p>
                      <div className="flex space-x-6 mt-4 md:mt-0">
                        <button className="text-sm opacity-70 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer" aria-label="Privacy Policy">Privacy Policy</button>
                        <button className="text-sm opacity-70 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer" aria-label="Terms of Service">Terms of Service</button>
                        <button className="text-sm opacity-70 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer" aria-label="Cookies">Cookies</button>
                      </div>
                    </div>
                  </div>
                </footer>
                </div>
                );
                };
                
                export default TeamPage;