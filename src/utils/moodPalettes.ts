import type { Mood, MoodPalette } from '../types';

export const moodPalettes: Record<Mood, MoodPalette> = {
  melancholy: {
    colors: ['#2C3E6B', '#4A6FA5', '#7BA7C2', '#B8D4E3', '#1a1a2e'],
    background: '#0a0f1d'
  },
  euphoria: {
    colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FC8'],
    background: '#ffffff'
  },
  cozy: {
    colors: ['#D4876A', '#C4956A', '#E8C39E', '#F2DBA8', '#8B5E3C'],
    background: '#fff9f0'
  },
  anxiety: {
    colors: ['#2D0000', '#8B0000', '#C41E3A', '#FF4500', '#1a0a0a'],
    background: '#050000'
  },
  serene: {
    colors: ['#A8D5BA', '#7FB5A0', '#5C9E8A', '#3D7A6E', '#E8F5EE'],
    background: '#f0faf5'
  },
  nostalgia: {
    colors: ['#D4A5A5', '#C3B1C0', '#A89BB8', '#9B8DB0', '#F5E6E8'],
    background: '#fdf8f9'
  },
  rage: {
    colors: ['#FF0000', '#CC0000', '#FF4400', '#880000', '#1a0000'],
    background: '#0a0000'
  },
  dreamy: {
    colors: ['#B8A9C9', '#D4C5E2', '#C9D4F0', '#A9C4D4', '#F0E6FA'],
    background: '#f8f4ff'
  },
  hopeful: {
    colors: ['#FFD700', '#FFA500', '#FF8C42', '#FFEC94', '#FFF3B0'],
    background: '#fffdf0'
  },
  void: {
    colors: ['#000000', '#0a0a0a', '#111111', '#1a1a1a', '#050505'],
    background: '#000000'
  },
};

export const getMoodPalette = (mood: string): MoodPalette => {
  const m = mood.toLowerCase() as Mood;
  return moodPalettes[m] || moodPalettes.euphoria;
};
