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

  useEffect(() => {
    blobsRef.current = blobs;
  }, [blobs]);

  // Update target colors when palette changes
  useEffect(() => {
    blobsRef.current.forEach(blob => {
      blob.targetColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }, [colors]);

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
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobsRef.current.forEach((blob) => {
        if (blob.color !== blob.targetColor) {
          blob.color = chroma.mix(blob.color, blob.targetColor, 0.01).hex();
        }

        const nx = noise2D(blob.offsetX + time * blob.speed, 0);
        const ny = noise2D(0, blob.offsetY + time * blob.speed);
        const nr = noise2D(blob.offsetX + time * blob.speed * 0.5, blob.offsetY + time * blob.speed * 0.5);

        const x = blob.baseX + nx * (canvas.width * 0.4);
        const y = blob.baseY + ny * (canvas.height * 0.4);
        const radius = blob.radius + nr * 20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        
        ctx.shadowBlur = 80;
        ctx.shadowColor = blob.color;
        ctx.fillStyle = blob.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
