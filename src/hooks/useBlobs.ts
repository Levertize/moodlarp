import { useState, useEffect, useCallback, useRef } from 'react';
import type { Blob } from '../types';

export const useBlobs = (count: number, colors: string[]) => {
  const colorsRef = useRef(colors);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  const generateBlobs = useCallback((blobCount: number, blobColors: string[]) => {
    const newBlobs: Blob[] = [];
    for (let i = 0; i < blobCount; i++) {
      const radius = Math.random() * 150 + 100;
      const color = blobColors[Math.floor(Math.random() * blobColors.length)];
      newBlobs.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius,
        color: color,
        targetColor: color,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        offsetX: Math.random() * 1000,
        offsetY: Math.random() * 1000,
        speed: Math.random() * 0.0005 + 0.0002,
      });
    }
    return newBlobs;
  }, []);

  const [blobs, setBlobs] = useState<Blob[]>(() => generateBlobs(count, colors));

  const initBlobs = useCallback(() => {
    setBlobs(generateBlobs(count, colorsRef.current));
  }, [count, generateBlobs]);

  return { blobs, initBlobs };
};
