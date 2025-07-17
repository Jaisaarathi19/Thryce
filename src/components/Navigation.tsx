import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverEffect, setHoverEffect] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const slidingBoxRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const updateSlidingBox = (target: HTMLElement | null) => {
    if (!target || !slidingBoxRef.current) return;
    const { offsetLeft, offsetWidth } = target;
    slidingBoxRef.current.style.left = `${offsetLeft}px`;
    slidingBoxRef.current.style.width = `${offsetWidth}px`;
  };

  useEffect(() => {
    const activeLink = navRef.current?.querySelector('a.text-red-500, a.text-red-400');
    updateSlidingBox(activeLink as HTMLElement);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    navLinks.forEach(link => {
      link.classList.add('nav-link-transition');
      link.classList.remove('active');
      
      const particle = document.createElement('div');
      particle.className = 'cyber-particle';
      link.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    });

    const activeLinks = document.querySelectorAll(`a[href="${path}"], a[href="${path}/"]`);
    activeLinks.forEach(link => link.classList.add('active'));

    setIsMenuOpen(false);

    setTimeout(() => {
      navigate(path);
      
      setTimeout(() => {
        navLinks.forEach(link => {
          link.classList.remove('nav-link-transition');
        });
      }, 500);
    }, 300);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${scrolled ? (darkMode ? 'bg-black/90' : 'bg-white/90') : 'bg-transparent'} backdrop-blur-md border-b ${darkMode ? 'border-black/20' : 'border-white/20'} transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-red-500/10 before:to-transparent before:animate-pulse`}>
      <div className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="group relative hover:scale-105 transition-transform duration-300 ease-out"
            >
              <img 
                src={darkMode ? '/logo/THRYCE_black_logo.png' : '/logo/THRYCE_white_logo.png'}
                alt="Thryce Logo"
                className="h-12 w-auto transition-all duration-300 hover:drop-shadow-lg group-hover:brightness-110"
              />
            </Link>
          </div>
          
          <nav ref={navRef} className="hidden md:flex items-center space-x-2 relative">
            <div 
              ref={slidingBoxRef} 
              className={`absolute h-12 ${darkMode ? 'bg-gradient-to-r from-red-500/20 via-red-400/30 to-red-500/20' : 'bg-gradient-to-r from-red-500/10 via-red-400/20 to-red-500/10'} rounded-lg transition-all duration-500 ease-out transform backdrop-blur-sm border ${darkMode ? 'border-red-400/30' : 'border-red-500/20'} shadow-lg`}
            />
            {[{ path: '/', label: 'Home' }, { path: '/services', label: 'Services' }, { path: '/projects', label: 'Projects' }, { path: '/team', label: 'Team' }, { path: '/contact', label: 'Contact' }].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
                onMouseEnter={(e) => {
                  setHoverEffect(item.path);
                  updateSlidingBox(e.currentTarget);
                }}
                onMouseLeave={() => {
                  setHoverEffect(null);
                  const activeLink = navRef.current?.querySelector('a.text-red-500, a.text-red-400');
                  updateSlidingBox(activeLink as HTMLElement);
                }}
                className={`relative z-10 text-lg font-semibold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer whitespace-nowrap px-4 py-3 rounded-lg font-['Inter'] hover:scale-105 hover:tracking-[0.15em] transform ${hoverEffect === item.path ? 'animate-pulse' : ''} ${
                  location.pathname === item.path
                    ? 'text-red-500 dark:text-red-400 shadow-lg'
                    : `${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                }`}
              >
                <span className="relative">
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'group-hover:w-full'}`}></span>
                </span>
              </Link>
            ))}
            <button onClick={toggleTheme} className="ml-6 p-2 rounded-full transition-all duration-500 cursor-pointer hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:rotate-180 hover:scale-110 relative group backdrop-blur-sm border border-transparent hover:border-red-400/30">
              <i className={`fa text-lg ${darkMode ? 'fa-sun text-red-400 group-hover:text-red-300' : 'fa-moon text-red-600 group-hover:text-red-500'} transition-all duration-300 drop-shadow-lg`}></i>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 via-red-400/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>
            </button>
          </nav>
          
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="mr-4 p-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-red-400/20">
              <i className={`fa text-lg ${darkMode ? 'fa-sun text-red-400' : 'fa-moon text-red-600'} transition-all duration-300 drop-shadow-lg`}></i>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-red-400/20"
            >
              <i className={`fa text-lg transition-all duration-300 ${isMenuOpen ? 'fa-times text-red-600 rotate-90' : `fa-bars ${darkMode ? 'text-white' : 'text-black'}`}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden ${isMenuOpen ? 'max-h-screen py-3' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} mobile-nav`}>
        <div className="container mx-auto px-6 flex flex-col space-y-1">
          {[{ path: '/', label: 'Home' }, { path: '/services', label: 'Services' }, { path: '/projects', label: 'Projects' }, { path: '/team', label: 'Team' }, { path: '/contact', label: 'Contact' }].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.path);
              }}
              onMouseEnter={() => setHoverEffect(item.path)}
              onMouseLeave={() => setHoverEffect(null)}
              className={`text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 cursor-pointer whitespace-nowrap px-6 py-3 rounded-lg font-['Inter'] hover:scale-105 hover:tracking-[0.15em] transform hover:translate-x-2 relative overflow-hidden ${hoverEffect === item.path ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/20 before:via-red-400/10 before:to-red-500/20 before:animate-pulse' : ''} ${location.pathname === item.path ? 'text-red-500 dark:text-red-400 bg-gradient-to-r from-red-500/10 via-red-400/5 to-red-500/10 border-l-4 border-red-500' : `${darkMode ? 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-red-500/5 hover:to-red-400/5'}`}`}
            >
              <span className="relative z-10 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${location.pathname === item.path ? 'bg-red-500' : 'bg-transparent border border-gray-400'}`}></span>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;