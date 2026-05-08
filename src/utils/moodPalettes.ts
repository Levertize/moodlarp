import type { Mood, MoodPalette } from '../types';

export const moodPalettes: Record<Mood, MoodPalette> = {
  melancholy: {
    colors: ['#2C3E6B', '#4A6FA5', '#7BA7C2', '#B8D4E3', '#1a1a2e'],
    background: '#0a0f1d',
    title: 'Melancholic Blue',
    description: 'Echoes of a distant memory.'
  },
  euphoria: {
    colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FC8'],
    background: '#ffffff',
    title: 'Euphoric Burst',
    description: 'Infinite joy in every particle.'
  },
  cozy: {
    colors: ['#D4876A', '#C4956A', '#E8C39E', '#F2DBA8', '#8B5E3C'],
    background: '#fff9f0',
    title: 'Cozy Hearth',
    description: 'Warmth that wraps around your soul.'
  },
  anxiety: {
    colors: ['#2D0000', '#8B0000', '#C41E3A', '#FF4500', '#1a0a0a'],
    background: '#050000',
    title: 'Restless Static',
    description: 'Chaos seeking a moment of peace.'
  },
  serene: {
    colors: ['#A8D5BA', '#7FB5A0', '#5C9E8A', '#3D7A6E', '#E8F5EE'],
    background: '#f0faf5',
    title: 'Serene Garden',
    description: 'A quiet breath in the middle of time.'
  },
  nostalgia: {
    colors: ['#D4A5A5', '#C3B1C0', '#A89BB8', '#9B8DB0', '#F5E6E8'],
    background: '#fdf8f9',
    title: 'Nostalgic Dream',
    description: 'Faded polaroids of moments past.'
  },
  rage: {
    colors: ['#FF0000', '#CC0000', '#FF4400', '#880000', '#1a0000'],
    background: '#0a0000',
    title: 'Burning Rage',
    description: 'Raw energy, untamed and powerful.'
  },
  dreamy: {
    colors: ['#B8A9C9', '#D4C5E2', '#C9D4F0', '#A9C4D4', '#F0E6FA'],
    background: '#f8f4ff',
    title: 'Dreamy Veil',
    description: 'Where reality blurs into the surreal.'
  },
  hopeful: {
    colors: ['#FFD700', '#FFA500', '#FF8C42', '#FFEC94', '#FFF3B0'],
    background: '#fffdf0',
    title: 'Golden Hope',
    description: 'The light that finds you in the dark.'
  },
  void: {
    colors: ['#000000', '#0a0a0a', '#111111', '#1a1a1a', '#050505'],
    background: '#000000',
    title: 'Silent Void',
    description: 'Nothingness that holds everything.'
  },
};

export const getMoodPalette = (mood: string): MoodPalette => {
  const m = mood.toLowerCase() as Mood;
  return moodPalettes[m] || moodPalettes.euphoria;
};
