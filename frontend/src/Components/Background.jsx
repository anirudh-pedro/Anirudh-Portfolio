import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [starsTrigger, setStarsTrigger] = useState(0);
  
  // Handle resize for responsive canvas
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Trigger occasional shooting stars
  useEffect(() => {
    const interval = setInterval(() => {
      setStarsTrigger(prev => prev + 1);
    }, 12000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Draw star field on canvas
  useEffect(() => {
    if (!canvasRef.current || dimensions.width <= 0 || dimensions.height <= 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Background gradient - elegant dark tones
    const bgGradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
    bgGradient.addColorStop(0, '#0B0F1A');
    bgGradient.addColorStop(0.7, '#111827');
    bgGradient.addColorStop(1, '#131B2E');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    
    // Add subtle texture noise
    try {
      const noiseCanvas = document.createElement('canvas');
      const noiseCtx = noiseCanvas.getContext('2d');
      noiseCanvas.width = dimensions.width;
      noiseCanvas.height = dimensions.height;
      
      const noiseData = noiseCtx.createImageData(dimensions.width, dimensions.height);
      const data = noiseData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20;
        if (noise < 1.8) {
          data[i] = data[i+1] = data[i+2] = 255;
          data[i+3] = Math.random() * 20;
        }
      }
      
      noiseCtx.putImageData(noiseData, 0, 0);
      ctx.globalAlpha = 0.15;
      ctx.drawImage(noiseCanvas, 0, 0);
      ctx.globalAlpha = 1.0;
    } catch (error) {
      console.warn('Error creating noise texture:', error);
    }
    
    // Enhanced star field with three layers
    ctx.globalCompositeOperation = 'lighten';
    
    // Layer 1: Distant tiny stars (many)
    for (let i = 0; i < dimensions.width * 0.25; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const radius = Math.random() * 0.8;
      const opacity = Math.random() * 0.4 + 0.1;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
    
    // Layer 2: Medium stars
    for (let i = 0; i < dimensions.width * 0.08; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const radius = Math.random() * 1.2 + 0.6;
      const opacity = Math.random() * 0.6 + 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      
      // Add subtle glow to medium stars
      if (opacity > 0.7) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(x, y, radius, x, y, radius * 3);
        glow.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
        glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }
    
    // Layer 3: Bright stars with subtle glow (more for visual interest)
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const radius = Math.random() * 1.8 + 1;
      
      // Star core
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      
      // Star glow
      ctx.beginPath();
      ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
      const glow = ctx.createRadialGradient(x, y, radius, x, y, radius * 4);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.fill();
      
      // Subtle cross flare
      ctx.beginPath();
      ctx.moveTo(x - radius * 5, y);
      ctx.lineTo(x + radius * 5, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = radius * 0.5;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x, y - radius * 5);
      ctx.lineTo(x, y + radius * 5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = radius * 0.5;
      ctx.stroke();
    }
    
    // Draw subtle vertical light trails
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * dimensions.width;
      const trailHeight = Math.random() * 200 + 100;
      const trailWidth = Math.random() * 1.2 + 0.3;
      const opacity = Math.random() * 0.2 + 0.05;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, trailHeight);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.7, `rgba(180, 190, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.rect(x, Math.random() * dimensions.height, trailWidth, trailHeight);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw some elegant geometric shapes in the background
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const size = Math.random() * 200 + 100;
      const opacity = Math.random() * 0.04 + 0.01;
      
      ctx.globalAlpha = opacity;
      
      // Random shape type
      const shapeType = Math.floor(Math.random() * 3);
      
      if (shapeType === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (shapeType === 1) {
        // Rectangle
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Line
        const angle = Math.random() * Math.PI * 2;
        const length = size * 1.5;
        ctx.beginPath();
        ctx.moveTo(
          x - Math.cos(angle) * length / 2,
          y - Math.sin(angle) * length / 2
        );
        ctx.lineTo(
          x + Math.cos(angle) * length / 2,
          y + Math.sin(angle) * length / 2
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    }
  }, [dimensions]);
  
  // Generate elegant geometric shapes (increased to compensate for removed rocks)
  const geometricShapes = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const size = Math.random() * 120 + 40;
      const shapeType = ['circle', 'square', 'triangle', 'line'][Math.floor(Math.random() * 4)];
      
      // Subtle, elegant colors
      const colors = [
        'rgba(148, 163, 184, 0.12)', // Slate
        'rgba(139, 148, 187, 0.1)',  // Light blue-gray
        'rgba(167, 139, 187, 0.08)', // Soft purple-gray
        'rgba(133, 148, 173, 0.1)',  // Cool gray
      ];
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        type: shapeType,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05,
        duration: Math.random() * 90 + 60,
        delay: Math.random() * 30,
        rotate: Math.random() * 360,
        lineLength: Math.random() * 120 + 40,
        lineWidth: Math.random() * 1 + 0.5,
      };
    });
  }, []);
  
  // Generate shooting stars that cross the screen
  const shootingStars = React.useMemo(() => {
    return [
      {
        id: 1,
        startX: -5,
        startY: 20 + Math.random() * 30,
        endX: 105,
        endY: 40 + Math.random() * 30,
        duration: 2 + Math.random() * 1,
        delay: 0.5,
        size: 1.5 + Math.random() * 0.5,
        tailLength: 70 + Math.random() * 30
      },
      {
        id: 2,
        startX: 105,
        startY: 10 + Math.random() * 30,
        endX: -5,
        endY: 30 + Math.random() * 30,
        duration: 2 + Math.random() * 1,
        delay: 3,
        size: 1.5 + Math.random() * 0.5,
        tailLength: 70 + Math.random() * 30
      }
    ];
  }, [starsTrigger]);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0F1A]">
      {/* Base canvas for stars and background elements */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        width={dimensions.width > 0 ? dimensions.width : 300}
        height={dimensions.height > 0 ? dimensions.height : 150}
      />
      
      {/* Only render elements if dimensions are valid */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <>
          {/* Geometric background shapes */}
          {geometricShapes.map(shape => (
            <motion.div
              key={`shape-${shape.id}`}
              className="absolute"
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                opacity: shape.opacity,
              }}
              animate={{
                x: [0, Math.random() * 30 - 15],
                y: [0, Math.random() * 30 - 15],
                rotate: [0, shape.rotate],
                opacity: [shape.opacity, shape.opacity * 0.7, shape.opacity],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: shape.delay,
                ease: "easeInOut",
              }}
            >
              {/* Render different shape types */}
              {shape.type === 'circle' && (
                <div 
                  className="rounded-full border border-solid"
                  style={{
                    width: shape.size,
                    height: shape.size,
                    borderColor: shape.color,
                    backgroundColor: 'transparent',
                  }}
                />
              )}
              
              {shape.type === 'square' && (
                <div 
                  className="border border-solid"
                  style={{
                    width: shape.size,
                    height: shape.size,
                    borderColor: shape.color,
                    backgroundColor: 'transparent',
                  }}
                />
              )}
              
              {shape.type === 'triangle' && (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${shape.size / 2}px solid transparent`,
                    borderRight: `${shape.size / 2}px solid transparent`,
                    borderBottom: `${shape.size * 0.866}px solid ${shape.color}`,
                  }}
                />
              )}
              
              {shape.type === 'line' && (
                <div
                  style={{
                    width: shape.lineLength,
                    height: shape.lineWidth,
                    backgroundColor: shape.color,
                  }}
                />
              )}
            </motion.div>
          ))}
          
          {/* Shooting stars */}
          {shootingStars.map(star => (
            <motion.div
              key={`shooting-star-${star.id}-${starsTrigger}`}
              className="absolute"
              style={{
                width: star.tailLength,
                height: star.size,
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                background: `linear-gradient(to ${star.startX < star.endX ? 'left' : 'right'}, rgba(255,255,255,0.95), rgba(255,255,255,0))`,
                borderRadius: '40%',
                transformOrigin: star.startX < star.endX ? '100% 50%' : '0% 50%',
                rotate: `${Math.atan2(star.endY - star.startY, star.endX - star.startX) * (180 / Math.PI)}deg`,
                boxShadow: '0 0 8px rgba(255,255,255,0.7)',
                zIndex: 5,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                left: [`${star.startX}%`, `${star.endX}%`],
                top: [`${star.startY}%`, `${star.endY}%`],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                ease: "easeOut",
                times: [0, 0.1, 1],
              }}
            />
          ))}
          
          {/* Subtle vertical light beams */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => {
              const width = Math.random() * 80 + 60;
              const posX = Math.random() * 100;
              const opacity = Math.random() * 0.05 + 0.01; // Very subtle
              
              return (
                <motion.div
                  key={`beam-${i}`}
                  className="absolute h-full"
                  style={{
                    width: width,
                    left: `${posX}%`,
                    background: `linear-gradient(to bottom, transparent, rgba(148, 163, 184, ${opacity}) 50%, transparent)`,
                    transform: 'translateX(-50%)',
                  }}
                  animate={{
                    opacity: [opacity, opacity * 1.3, opacity],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F1A]/80" />
    </div>
  );
};

export default SpaceBackground;