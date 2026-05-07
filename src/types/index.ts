export interface Blob {
  x: number;
  y: number;
  radius: number;
  color: string;
  targetColor: string;
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  speed: number;
}

export type Mood = 
  | 'melancholy'
  | 'euphoria'
  | 'cozy'
  | 'anxiety'
  | 'serene'
  | 'nostalgia'
  | 'rage'
  | 'dreamy'
  | 'hopeful'
  | 'void';

export interface MoodPalette {
  colors: string[];
  background: string;
}
