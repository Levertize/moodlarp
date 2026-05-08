import type { Mood } from '../types';

const moodKeywords: Record<string, Mood[]> = {
  melancholy: ['sad', 'blue', 'unhappy', 'lonely', 'miss', 'cry', 'dark', 'gloomy'],
  euphoria: ['happy', 'excited', 'yay', 'joy', 'great', 'amazing', 'bliss', 'awesome'],
  cozy: ['warm', 'comfy', 'home', 'soft', 'coffee', 'tea', 'hug', 'snuggle'],
  anxiety: ['stress', 'worry', 'fast', 'panic', 'nervous', 'tense', 'shake'],
  serene: ['calm', 'quiet', 'peace', 'still', 'zen', 'breathe', 'smooth'],
  nostalgia: ['old', 'memory', 'past', 'back', 'childhood', 'remember'],
  rage: ['angry', 'mad', 'hate', 'furious', 'burn', 'scream', 'fire'],
  dreamy: ['sleep', 'cloud', 'wonder', 'magic', 'soft', 'float', 'star'],
  hopeful: ['light', 'future', 'wish', 'dream', 'rise', 'gold', 'shine'],
  void: ['empty', 'nothing', 'black', 'lost', 'end', 'gone', 'space'],
};

export const matchMood = (text: string): Mood | null => {
  const normalized = text.toLowerCase();
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return mood as Mood;
    }
  }
  
  return null;
};
