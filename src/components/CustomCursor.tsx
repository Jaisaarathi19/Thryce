import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners for interactive elements
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isClicking ? 'scale-75' : isHovering ? 'scale-0' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
        }}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 bg-red-400/80 border-red-300 shadow-[0_0_20px_rgba(248,113,113,0.6)]`}
        />
      </div>

      {/* Outer ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isClicking ? 'scale-50' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border transition-all duration-300 ${
            isHovering
              ? 'border-red-300/60 bg-red-400/10'
              : 'border-red-400/40 bg-transparent'
          }`}
        />
      </div>

      {/* Trailing particles */}
      {isHovering && (
        <>
          <div
            className="fixed top-0 left-0 pointer-events-none z-[9997] animate-ping"
            style={{
              transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
              animationDuration: '1s',
            }}
          >
            <div
              className={`w-3 h-3 rounded-full bg-red-400/40`}
            />
          </div>
          <div
            className="fixed top-0 left-0 pointer-events-none z-[9996] animate-pulse"
            style={{
              transform: `translate(${mousePosition.x - 15}px, ${mousePosition.y - 15}px)`,
              animationDelay: '0.1s',
            }}
          >
            <div
              className={`w-8 h-8 rounded-full border border-red-300/30`}
            />
          </div>
        </>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9995] animate-ping"
          style={{
            transform: `translate(${mousePosition.x - 25}px, ${mousePosition.y - 25}px)`,
            animationDuration: '0.6s',
          }}
        >
          <div
            className={`w-12 h-12 rounded-full border-2 border-red-300/50`}
          />
        </div>
      )}

      {/* Hover magnetic effect */}
      {isHovering && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9994]"
          style={{
            transform: `translate(${mousePosition.x - 30}px, ${mousePosition.y - 30}px)`,
          }}
        >
          <div
            className={`w-15 h-15 rounded-full animate-spin-slow bg-gradient-to-r from-red-400/20 via-transparent to-red-300/20`}
            style={{
              width: '60px',
              height: '60px',
              animationDuration: '3s',
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
