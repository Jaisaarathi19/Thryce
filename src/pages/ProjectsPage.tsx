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
      link: "https://datalore-phi.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: "Brand Identity Design",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image: "https://public.readdy.ai/ai/img_res/brand-identity.jpg",
      category: "graphic",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "Marketing Campaign Visuals",
      description: "Created engaging visual content for social media, print materials, and digital advertising campaigns.",
      image: "https://public.readdy.ai/ai/img_res/marketing-campaign.jpg",
      category: "graphic",
      technologies: ["Adobe Photoshop", "Adobe InDesign", "Canva Pro"],
      link: "#",
      featured: true
    },
    {
      id: 4,
      title: "Product Packaging Design",
      description: "Innovative packaging design for a premium skincare line, including box design, labels, and promotional materials.",
      image: "https://public.readdy.ai/ai/img_res/packaging-design.jpg",
      category: "graphic",
      technologies: ["Adobe Illustrator", "Adobe Dimension", "Blender"],
      link: "#",
      featured: true
    },
    {
      id: 5,
      title: "Magazine Layout Design",
      description: "Modern and elegant magazine layout design with custom typography, photo editing, and infographic creation.",
      image: "https://public.readdy.ai/ai/img_res/magazine-layout.jpg",
      category: "graphic",
      technologies: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
      link: "#",
      featured: true
    },
    {
      id: 6,
      title: "Motion Graphics Portfolio",
      description: "Dynamic motion graphics and animations for digital advertisements and social media content.",
      image: "https://public.readdy.ai/ai/img_res/motion-graphics.jpg",
      category: "graphic",
      technologies: ["After Effects", "Adobe Animate", "Cinema 4D"],
      link: "#",
      featured: true
    },
    {
        id: 7,
        title: "Logo Design",
        description: "Distinctive logo design for brands, focusing on red and black themes to ensure strong visual identity and memorability.",
        image: "https://public.readdy.ai/ai/img_res/logo-design-red-black.jpg",
        category: "logo",
        technologies: ["Adobe Illustrator", "Figma", "Photoshop"],
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
        {/* Hero Section */}
        <section className="relative min-h-[30vh] flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                <span className="block">My</span>
                <span className="block text-red-600">Projects</span>
              </h1>
              <p className="text-lg mb-4 opacity-80 max-w-2xl mx-auto">
                A showcase of my recent work across web and mobile platforms. Each project represents a unique challenge and solution.
              </p>
            </div>
          </div>
        </section>
        
        {/* All Projects Section */}
        <section className={`py-1 ${'bg-gray-900/50'}`}>
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <div className="flex justify-center mb-12">
              <div className={`inline-flex rounded-lg p-1 ${'bg-gray-800'} shadow-md`}>
                <button 
                  onClick={() => setActiveCategory('all')} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'all' 
                      ? 'bg-red-600 text-white' 
                      : `${'hover:bg-gray-700'}`
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveCategory('web')} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'web' 
                      ? 'bg-red-600 text-white' 
                      : `${'hover:bg-gray-700'}`
                  }`}
                >
                  Web Development
                </button>
                <button 
                  onClick={() => setActiveCategory('graphic')} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'graphic' 
                      ? 'bg-red-600 text-white' 
                      : `${'hover:bg-gray-700'}`
                  }`}
                >
                  Graphic Design
                </button>
                <button 
                  onClick={() => setActiveCategory('logo')} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'logo' 
                      ? 'bg-red-600 text-white' 
                      : `${'hover:bg-gray-700'}`
                  }`}
                >
                  Logo Designing
                </button>
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${'bg-gray-800/50'}`}
                >
                  <div className="h-48 overflow-hidden">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </a>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.category === 'web' 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : project.category === 'logo'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-purple-500/10 text-purple-500'
                      }`}>
                        {project.category === 'web' ? 'Web Development' : project.category === 'logo' ? 'Logo Designing' : 'Graphic Designing'}
                      </span>
                    </div>
                    <p className="opacity-80 mb-4 text-sm line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-gray-700'}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-gray-700'}`}>
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      View Details <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className={`p-12 rounded-xl text-center ${'bg-gray-800'} shadow-lg`}>
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="opacity-70">No projects match the selected category. Try selecting a different category.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className={`rounded-2xl overflow-hidden relative ${'bg-black'} shadow-xl`}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 p-12 md:p-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Project in Mind?</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8 opacity-70">
                  We're always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <Link to="/contact" className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-transparent hover:border-2 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap">
                  Get in Touch
                </Link>
              </div>
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
                  src={'/logo/THRYCE_white_logo.png'}
                  alt="Thryce Logo"
                  className="h-8 w-auto transition-all duration-300 hover:drop-shadow-lg group-hover:brightness-110"
                />
              </Link>
              <p className="mt-2 opacity-70">Crafting digital experiences that inspire.</p>
            </div>
            <div className="flex space-x-6">
              <button className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none" aria-label="Dribbble">
                <i className="fab fa-dribbble text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none" aria-label="GitHub">
                <i className="fab fa-github text-xl"></i>
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-xl"></i>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70">© 2023 Thryce Studio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-sm opacity-70 hover:text-red-600 transition-colors focus:outline-none" aria-label="Privacy Policy">Privacy Policy</button>
              <button className="text-sm opacity-70 hover:text-red-600 transition-colors focus:outline-none" aria-label="Terms of Service">Terms of Service</button>
              <button className="text-sm opacity-70 hover:text-red-600 transition-colors focus:outline-none" aria-label="Cookies">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
