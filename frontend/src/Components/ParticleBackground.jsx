import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseActive = false;
    let mouseRadius = 150; // Radius of mouse influence

    // Mouse event handlers
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth * 0.05); // Adjust density
      
      // Particle colors - brighter options
      const particleColors = [
        'rgba(255, 255, 255, 0.8)',  // Bright white
        'rgba(173, 216, 230, 0.8)',  // Light blue
        'rgba(186, 85, 211, 0.8)',   // Medium orchid
        'rgba(135, 206, 250, 0.8)',  // Light sky blue
        'rgba(176, 224, 230, 0.7)'   // Powder blue
      ];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.8, // Slightly larger particles
          originalRadius: Math.random() * 2 + 0.8, // Store original size
          vx: Math.random() * 0.3 - 0.15,  // Slightly faster movement
          vy: Math.random() * 0.3 - 0.15,
          // Track original velocity for restoring after mouse influence
          originalVx: Math.random() * 0.3 - 0.15,
          originalVy: Math.random() * 0.3 - 0.15,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          pulse: Math.random() * 0.08 + 0.02, // For pulsing effect
          pulseSpeed: 0.005 + Math.random() * 0.01,
          // Properties for mouse interaction
          attracted: false,
          attractionStrength: Math.random() * 0.05 + 0.02
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const drawParticles = (time) => {
      // Fill with solid black background
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse influence area when mouse is active
      if (isMouseActive) {
        const mouseGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, mouseRadius
        );
        mouseGradient.addColorStop(0, 'rgba(100, 100, 255, 0.05)');
        mouseGradient.addColorStop(0.5, 'rgba(100, 100, 255, 0.02)');
        mouseGradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, mouseRadius, 0, Math.PI * 2);
        ctx.fillStyle = mouseGradient;
        ctx.fill();
      }
      
      particles.forEach((particle, i) => {
        // Apply mouse attraction
        if (isMouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            // Calculate attraction strength based on distance
            const force = (1 - distance / mouseRadius) * particle.attractionStrength;
            
            // Direction vector to mouse
            const dirX = dx / distance;
            const dirY = dy / distance;
            
            // Apply attraction force
            particle.vx += dirX * force;
            particle.vy += dirY * force;
            
            // Mark as being attracted
            particle.attracted = true;
            
            // Increase size when attracted
            particle.radius = particle.originalRadius * (1 + force * 5);
          } else if (particle.attracted) {
            // Gradually return to original velocity when no longer attracted
            particle.vx = particle.vx * 0.95 + particle.originalVx * 0.05;
            particle.vy = particle.vy * 0.95 + particle.originalVy * 0.05;
            
            // Gradually return to original size
            particle.radius = particle.radius * 0.9 + particle.originalRadius * 0.1;
            
            // Reset attraction flag if velocity is close to original
            if (Math.abs(particle.vx - particle.originalVx) < 0.01 && 
                Math.abs(particle.vy - particle.originalVy) < 0.01) {
              particle.attracted = false;
            }
          }
        } else if (particle.attracted) {
          // Return to original velocity when mouse is inactive
          particle.vx = particle.vx * 0.95 + particle.originalVx * 0.05;
          particle.vy = particle.vy * 0.95 + particle.originalVy * 0.05;
          
          // Return to original size
          particle.radius = particle.radius * 0.9 + particle.originalRadius * 0.1;
          
          // Reset attraction flag if velocity is close to original
          if (Math.abs(particle.vx - particle.originalVx) < 0.01 && 
              Math.abs(particle.vy - particle.originalVy) < 0.01) {
            particle.attracted = false;
          }
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.originalVx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.originalVy *= -1;
        }
        
        // Speed limit to prevent particles from moving too fast
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 2) {
          particle.vx = (particle.vx / speed) * 2;
          particle.vy = (particle.vy / speed) * 2;
        }
        
        // Pulsing size effect
        const pulseEffect = Math.sin(time * particle.pulseSpeed) * particle.pulse;
        const pulseSize = particle.radius + pulseEffect;
        
        // Draw particle with glow effect
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 3
        );
        
        // Adjust glow intensity for attracted particles
        let glowIntensity = particle.attracted ? 0.3 : 0.2;
        const baseColor = particle.color.replace(/[\d\.]+\)$/, `${glowIntensity})`);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.attracted ? 
          'rgba(255, 255, 255, 0.9)' : // Brighter when attracted
          particle.color;
        ctx.fill();
        
        // Draw connections with improved visibility
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) { // Connection distance
              // Create gradient for connections
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              
              // Connections are brighter when particles are attracted
              let connectionOpacity = 0.2;
              if (particle.attracted && otherParticle.attracted) {
                connectionOpacity = 0.4; // Brighter when both particles are attracted
              } else if (particle.attracted || otherParticle.attracted) {
                connectionOpacity = 0.3; // Slightly brighter when one particle is attracted
              }
              
              const opacity = connectionOpacity * (1 - distance / 150);
              
              const color1 = particle.color.replace(/[\d\.]+\)$/, `${opacity})`);
              const color2 = otherParticle.color.replace(/[\d\.]+\)$/, `${opacity})`);
              
              gradient.addColorStop(0, color1);
              gradient.addColorStop(1, color2);
              
              // Line width increases for attracted particles
              const lineWidth = (particle.attracted || otherParticle.attracted) ? 1.2 : 0.8;
              
              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(() => drawParticles(time + 1/60));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    drawParticles(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;