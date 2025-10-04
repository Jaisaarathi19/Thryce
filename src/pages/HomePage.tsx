import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const threeDCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  // 3D Animated Background
  useEffect(() => {
    const canvas = threeDCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Shape3D {
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      size: number;
      type: 'cube' | 'pyramid' | 'sphere' | 'torus';
      color: string;
      speedX: number;
      speedY: number;
      speedZ: number;
      rotationSpeedX: number;
      rotationSpeedY: number;
      rotationSpeedZ: number;
    }

    const shapes: Shape3D[] = [];
    const numShapes = 15;

    // Create 3D shapes
    for (let i = 0; i < numShapes; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        size: Math.random() * 60 + 40,
        type: ['cube', 'pyramid', 'sphere', 'torus'][Math.floor(Math.random() * 4)] as 'cube' | 'pyramid' | 'sphere' | 'torus',
        color: `rgba(${Math.random() > 0.5 ? 239 : 220}, ${Math.random() * 50 + 50}, ${Math.random() * 50 + 50}, ${Math.random() * 0.3 + 0.1})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: (Math.random() - 0.5) * 2,
        rotationSpeedX: (Math.random() - 0.5) * 0.02,
        rotationSpeedY: (Math.random() - 0.5) * 0.02,
        rotationSpeedZ: (Math.random() - 0.5) * 0.02
      });
    }

    // Wave effect
    const waves: { offset: number; speed: number; amplitude: number; frequency: number }[] = [];
    for (let i = 0; i < 3; i++) {
      waves.push({
        offset: 0,
        speed: 0.02 + i * 0.01,
        amplitude: 50 + i * 20,
        frequency: 0.005 + i * 0.002
      });
    }

    const draw3DShape = (shape: Shape3D) => {
      const scale = 1000 / (1000 + shape.z);
      const x = shape.x * scale + canvas.width / 2 * (1 - scale);
      const y = shape.y * scale + canvas.height / 2 * (1 - scale);
      const size = shape.size * scale;

      ctx.save();
      ctx.translate(x, y);
      
      // Apply 3D rotation effect (pseudo 3D)
      const rotationScale = Math.cos(shape.rotationY) * 0.5 + 0.5;
      
      ctx.globalAlpha = (1000 - shape.z) / 1000 * 0.6;
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color.replace(/[\d.]+\)$/g, '0.8)');
      ctx.lineWidth = 2;

      if (shape.type === 'cube') {
        // Draw cube
        const offset = size * 0.2 * Math.sin(shape.rotationX);
        ctx.fillRect(-size / 2, -size / 2 + offset, size * rotationScale, size * rotationScale);
        ctx.strokeRect(-size / 2, -size / 2 + offset, size * rotationScale, size * rotationScale);
      } else if (shape.type === 'pyramid') {
        // Draw pyramid
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(-size / 2 * rotationScale, size / 2);
        ctx.lineTo(size / 2 * rotationScale, size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === 'sphere') {
        // Draw sphere with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2);
        gradient.addColorStop(0, shape.color.replace(/[\d.]+\)$/g, '0.6)'));
        gradient.addColorStop(1, shape.color.replace(/[\d.]+\)$/g, '0.1)'));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size / 2 * rotationScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === 'torus') {
        // Draw torus
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, size / 3 * rotationScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWaves = () => {
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.1 - index * 0.03})`;
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
                   Math.sin(x * wave.frequency + wave.offset) * wave.amplitude +
                   Math.sin(x * wave.frequency * 2 + wave.offset * 1.5) * (wave.amplitude / 2);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        wave.offset += wave.speed;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      drawWaves();

      // Update and draw 3D shapes
      shapes.forEach(shape => {
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.z += shape.speedZ;
        shape.rotationX += shape.rotationSpeedX;
        shape.rotationY += shape.rotationSpeedY;
        shape.rotationZ += shape.rotationSpeedZ;

        // Wrap around screen
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;
        if (shape.z < -500) shape.z = 1500;
        if (shape.z > 1500) shape.z = -500;

        draw3DShape(shape);
      });

      // Draw connecting lines between nearby shapes
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dz = shapes[i].z - shapes[j].z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < 300) {
            const scale1 = 1000 / (1000 + shapes[i].z);
            const scale2 = 1000 / (1000 + shapes[j].z);
            const x1 = shapes[i].x * scale1 + canvas.width / 2 * (1 - scale1);
            const y1 = shapes[i].y * scale1 + canvas.height / 2 * (1 - scale1);
            const x2 = shapes[j].x * scale2 + canvas.width / 2 * (1 - scale2);
            const y2 = shapes[j].y * scale2 + canvas.height / 2 * (1 - scale2);
            
            ctx.globalAlpha = (1 - distance / 300) * 0.3;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll to services section function
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

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
      image: "/logo/THRYCE_black_logo_full.png"
    }
    // Add more services as needed
  ];

  // Portfolio data
  const portfolioItems = [
    {
      title: "Datalore Symposium",
      category: "Web Development",
      image: "/project_img/datalore.jpg"
    },
    {
      title: "Monish's Portfolio",
      category: "Web Development",
      image: "/project_img/monish-pf.png"
    },
    {
      title: "ALKET Logo Design",
      category: "Logo Design",
      image: "/logo/ALKET LOGO.png"
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
          {/* 3D Animated Background */}
          <canvas ref={threeDCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
          
          {/* Enhanced background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-red-950/20"></div>
          
          {/* Geometric patterns with enhanced animations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border border-red-500 rotate-45 animate-pulse animate-spin-slow"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border border-red-400 rotate-12 animate-pulse delay-1000 animate-float"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-red-600 rotate-90 animate-pulse delay-2000 animate-bounce-subtle"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-red-500/50 rounded-full animate-pulse-glow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 border border-red-400/40 rotate-45 animate-spin-slow"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="space-y-6">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-6 py-2 animate-slideInDown backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium uppercase tracking-wider">Welcome to Thryce</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fadeInUp">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Creative{' '}
                </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-gradient-shift">
                    Digital
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-700 opacity-20 blur-2xl animate-pulse"></span>
                </span>
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {' '}Solutions
                </span>
              </h1>
              
              <div className="relative mb-10 animate-slideInUp delay-200">
                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 text-gray-200 leading-relaxed">
                  Crafting immersive digital experiences with cutting-edge technology and stunning design that transforms ideas into reality.
                </p>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-12 animate-scaleIn delay-300">
                <Link 
                  to="/contact" 
                  className="group relative px-10 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] active:scale-95 animate-pulse-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Get in Touch</span>
                    <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 animate-shimmer"></div>
                </Link>
                <Link 
                  to="/projects" 
                  className="group relative px-10 py-4 border-2 border-red-500 text-white rounded-full font-semibold overflow-hidden transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-95 hover:bg-red-500/10"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span>View Projects</span>
                    <i className="fas fa-rocket transform group-hover:translate-y-[-2px] transition-transform duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
          {/* Modern scroll indicator: double chevron with glow and subtle pulse */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center select-none cursor-pointer group"
            onClick={scrollToServices}
          >
            <span className="relative flex flex-col items-center">
              <span className="block animate-bounce group-hover:animate-pulse transition-all duration-300">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#chevronGlow)">
                    <polyline points="12,16 18,24 24,16" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-300 transition-colors duration-300"/>
                    <polyline points="12,8 18,16 24,8" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" className="group-hover:stroke-red-300 transition-colors duration-300"/>
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
              <span className="block w-2 h-2 mt-1 rounded-full bg-red-500 shadow-[0_0_12px_4px_rgba(239,68,68,0.5)] animate-pulse group-hover:bg-red-300 group-hover:shadow-[0_0_16px_6px_rgba(239,68,68,0.7)] transition-all duration-300"></span>
            </span>
          </div>
        </section>
        
        {/* Services Section */}
        <section ref={servicesRef} className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600 rounded-full blur-3xl animate-pulse delay-1000 animate-bounce-subtle"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-400 rounded-full blur-3xl animate-pulse delay-500 opacity-30"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20 animate-fadeInUp">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6 animate-slideInDown">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium uppercase tracking-wide">What We Do</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-scaleIn">
                Our <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-gradient-shift">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slideInUp delay-200">
                We offer comprehensive digital solutions that transform your vision into reality
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-6 animate-shimmer"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 ${
                    index === 0 ? 'animate-slideInLeft' : index === 1 ? 'animate-fadeInUp' : 'animate-slideInRight'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Card background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                  </div>
                  
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Floating icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-red-400/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
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
                          <Link 
                            to="/projects" 
                            className="inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors duration-300"
                          >
                            View Project 
                            <i className="fas fa-arrow-right ml-2 text-sm transform group-hover:translate-x-1 transition-transform duration-300"></i>
                          </Link>
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

export default HomePage;