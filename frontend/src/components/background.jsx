import React, { useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const Background = () => {
  // ----------------------------------------------------------------------
  // 1. Mouse & Physics State (Pure React, no Framer Motion)
  // ----------------------------------------------------------------------
  const mouseRef = useRef({ x: 0, y: 0 });      // Target (Mouse) position
  const posRef = useRef({ x: 0, y: 0 });        // Current (Follower) position
  const velocityRef = useRef({ x: 0, y: 0 });   // Current Velocity
  const rafId = useRef(null);                   // Request Animation Frame ID

  // Refs for direct DOM manipulation (Performance optimization)
  const starContainerRef = useRef(null);
  const starTailRef = useRef(null);

  // Initialize positions to center
  useEffect(() => {
    posRef.current = { x: 0, y: 0 };
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
        // Calculate coordinates relative to the center of the screen
        // x: positive = right, negative = left
        // y: positive = down, negative = up
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation Loop
  useEffect(() => {
    const loop = () => {
        // Physics Constants
        const ease = 0.08; // smooth following easing

        // 1. Calculate distance from current pos to target (mouse)
        const dx = mouseRef.current.x - posRef.current.x;
        const dy = mouseRef.current.y - posRef.current.y;

        // 2. Update current position (Lerp)
        posRef.current.x += dx * ease;
        posRef.current.y += dy * ease;

        // 3. Update velocity
        velocityRef.current = { x: dx * ease, y: dy * ease };

        // 4. Calculate Rotation & Speed
        const vx = velocityRef.current.x;
        const vy = velocityRef.current.y;
        const speed = Math.sqrt(vx * vx + vy * vy);
        
        // Only rotate if moving significantly to avoid jitter at rest
        let rotation = 0;
        if (speed > 0.1) {
            rotation = Math.atan2(vy, vx) * (180 / Math.PI);
        }

        // 5. Visual Effects based on Speed
        // Scale tail from 0.5 to 1.5 based on speed (0 to 50px/frame)
        const scaleX = Math.min(Math.max(0.5 + speed / 40, 0.5), 1.8);
        
        // Opacity: fade out when stationary
        const opacity = Math.min(Math.max(speed / 3, 0), 1);

        // 6. Apply to DOM
        if (starContainerRef.current) {
            // Apply translation and rotation to the container
            starContainerRef.current.style.transform = 
                `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${rotation}deg)`;
        }

        if (starTailRef.current) {
            starTailRef.current.style.opacity = opacity;
            starTailRef.current.style.transform = `scaleX(${scaleX})`;
        }

        rafId.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ----------------------------------------------------------------------
  // Background Elements (Stars, Fireflies, etc.)
  // ----------------------------------------------------------------------
  const stars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() > 0.9 ? 2.5 : Math.random() > 0.7 ? 1.5 : 1,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  })), []);

  const fireflies = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 3,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? "#60a5fa" : "#a78bfa",
  })), []);

  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 25 + Math.random() * 15,
    delay: Math.random() * 15,
  })), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #050510 0%, #0a0a20 20%, #1a103d 50%, #2d1b4e 75%, #1a1a2e 100%)",
        }}
      />

      {/* Inline CSS Keyframes */}
      <style>{`
          @keyframes tail-sparkle {
              0% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(-20px); opacity: 0; }
          }
      `}</style>
      
      {/* -------------------- SHOOTING STAR (New Implementation) -------------------- */}
      <div
          ref={starContainerRef}
          className="absolute top-1/2 left-1/2 z-50 pointer-events-none will-change-transform"
          style={{
              width: 0, 
              height: 0,
              // transform set by JS loop
          }}
      >
          {/* 
             Pivot point wrapper.
             The container is at TOP: 50%, LEFT: 50%.
             We translate it by (mouse - center).
             Then we effectively place the star at (0,0) inside the container.
          */}
          <div className="relative flex items-center justify-end w-0 h-0">
              
              {/* THE STAR HEAD */}
              <div className="relative w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20 -translate-y-1/2 -translate-x-1/2">
                  <div className="absolute inset-0 bg-white blur-[1px] rounded-full" />
              </div>

              {/* DYNAMIC TAIL SECTION */}
              <div 
                  ref={starTailRef}
                  className="absolute right-1 h-8 flex items-center justify-end origin-right -translate-y-1/2"
                  style={{ 
                      width: '4rem', // w-16
                      // Opacity/Scale set by JS loop
                  }}
              >
                  {/* Core Streak */}
                  <div className="w-full h-0.5 bg-linear-to-l from-cyan-300 via-blue-500 to-transparent blur-[1px]" />
                  
                  {/* Outer Glow */}
                  <div className="absolute right-0 w-3/4 h-4 bg-linear-to-l from-blue-500/50 via-purple-500/30 to-transparent blur-[6px] rounded-l-full" />
                  
                  {/* Floating Sparkles */}
                  <div
                      className="absolute right-4 w-1 h-1 bg-cyan-200 rounded-full blur-[0.5px]"
                      style={{ animation: 'tail-sparkle 0.5s infinite linear' }}
                  />
              </div>
          </div>
      </div>

      {/* --- EXISTING BACKGROUND ELEMENTS --- */}
      
      {/* Animated nebula clouds */}
      <motion.div 
        className="absolute top-0 -left-1/4 w-200 h-200 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(19,92,246,0.4) 0%, rgba(88,28,135,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-175 h-175 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(30,64,175,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Stars layer */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* Fireflies */}
      <div className="absolute inset-0">
        {fireflies.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{ y: [0, -20, 5, -10, 0], x: [0, 10, -8, 5, 0], opacity: [0.4, 0.7, 0.5, 0.8, 0.4] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* Mystical orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 opacity-10">
        <motion.div 
          className="absolute inset-0 border border-purple-500/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
         <motion.div 
          className="absolute inset-20 border border-blue-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  )
}

export default Background