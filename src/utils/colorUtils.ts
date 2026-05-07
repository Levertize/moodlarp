import chroma from 'chroma-js';

export const interpolateColor = (color1: string, color2: string, factor: number) => {
  return chroma.mix(color1, color2, factor).hex();
};

export const getRandomHarmoniousPalette = () => {
  const base = chroma.random();
  return [
    base.hex(),
    base.brighten(1).hex(),
    base.saturate(1).hex(),
    base.set('hsl.h', '+30').hex(),
    base.set('hsl.h', '-30').hex(),
  ];
};
