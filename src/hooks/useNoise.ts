import { useMemo } from 'react';
import { createNoise2D } from 'simplex-noise';

export const useNoise = () => {
  const noise2D = useMemo(() => createNoise2D(), []);
  return noise2D;
};
