
import { useEffect, useRef } from 'react';
import './Starfield.css';

const STAR_COUNT = 130;

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const stars = [];

    const createStar = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 5,
      radius: Math.random() * 1.3 + 0.3,
      opacity: Math.random() * 0.55 + 0.2,
      speed: Math.random() * 0.22 + 0.04,
      drift: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.015 + 0.003,
      depth: Math.random() * 0.7 + 0.3,
    });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (stars.length === 0) {
        for (let i = 0; i < STAR_COUNT; i++) {
          stars.push(createStar(true));
        }
      }
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.y -= star.speed;
        star.x += star.drift;

        star.phase += star.twinkleSpeed;

        const twinkle =
          0.75 + Math.sin(star.phase) * 0.25;

        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 130;

        if (distance < interactionRadius && distance > 0) {
          const force =
            ((interactionRadius - distance) /
              interactionRadius) *
            0.65 *
            star.depth;

          star.x += (dx / distance) * force;
          star.y += (dy / distance) * force;
        }

        if (star.y < -5 || star.x < -5 || star.x > width + 5) {
          Object.assign(star, createStar());
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(224, 226, 255, ${
          star.opacity * twinkle
        })`;

        ctx.shadowBlur = star.radius > 1 ? 5 : 0;
        ctx.shadowColor = '#818cf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}

export default Starfield;