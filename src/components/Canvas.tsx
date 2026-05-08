import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useNoise } from '../hooks/useNoise';
import { useBlobs } from '../hooks/useBlobs';
import chroma from 'chroma-js';

interface CanvasProps {
  colors?: string[];
  blobCount?: number;
}

export interface CanvasHandle {
  save: (mood: string) => void;
  regenerate: () => void;
}

const Canvas = forwardRef<CanvasHandle, CanvasProps>(({ 
  colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FC8'],
  blobCount = 8 
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise2D = useNoise();
  const { blobs, initBlobs } = useBlobs(blobCount, colors);
  const blobsRef = useRef(blobs);
  
  // Particle system
  const particlesRef = useRef<{x: number, y: number, size: number, speed: number, alpha: number}[]>([]);

  useEffect(() => {
    blobsRef.current = blobs;
  }, [blobs]);

  // Update target colors when palette changes
  useEffect(() => {
    blobsRef.current.forEach(blob => {
      blob.targetColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }, [colors]);

  const initParticles = () => {
    const p = [];
    for (let i = 0; i < 150; i++) {
      p.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    particlesRef.current = p;
  };

  useImperativeHandle(ref, () => ({
    save: (mood: string) => {
      if (!canvasRef.current) return;
      const link = document.createElement('a');
      link.download = `mood-universe-${mood}-${new Date().getTime()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    },
    regenerate: () => {
      initBlobs();
      initParticles();
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Particles
      ctx.fillStyle = '#ffffff';
      particlesRef.current.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Blobs
      blobsRef.current.forEach((blob) => {
        if (blob.color !== blob.targetColor) {
          blob.color = chroma.mix(blob.color, blob.targetColor, 0.01).hex();
        }

        const nx = noise2D(blob.offsetX + time * blob.speed, 0);
        const ny = noise2D(0, blob.offsetY + time * blob.speed);
        const nr = noise2D(blob.offsetX + time * blob.speed * 0.5, blob.offsetY + time * blob.speed * 0.5);

        // Calculate interaction with mouse
        const dx = mouse.x - (blob.baseX + nx * (canvas.width * 0.4));
        const dy = mouse.y - (blob.baseY + ny * (canvas.height * 0.4));
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;
        
        let mouseForceX = 0;
        let mouseForceY = 0;
        
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 50;
          mouseForceX = (dx / dist) * force;
          mouseForceY = (dy / dist) * force;
        }

        const x = blob.baseX + nx * (canvas.width * 0.4) + mouseForceX;
        const y = blob.baseY + ny * (canvas.height * 0.4) + mouseForceY;
        const radius = blob.radius + nr * 20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        
        // Disable shadowBlur for gooey effect performance, the filter will handle the "blur"
        ctx.fillStyle = blob.color;
        ctx.globalAlpha = 1.0; // Filter needs full opacity for best colors
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [noise2D]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 transition-colors duration-1000"
    />
  );
});

export default Canvas;
