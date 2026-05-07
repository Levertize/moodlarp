import React, { useState } from 'react';
import type { Mood } from '../types';
import { moodPalettes } from '../utils/moodPalettes';

interface MoodInputProps {
  onMoodSelect: (mood: Mood) => void;
  currentMood: Mood;
}

const MoodInput: React.FC<MoodInputProps> = ({ onMoodSelect, currentMood }) => {
  const [customMood, setCustomMood] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we might use NLP to map this to a palette.
    // For now, let's just pick a random one if not found, or default to euphoria.
    const normalized = customMood.toLowerCase() as Mood;
    if (moodPalettes[normalized]) {
      onMoodSelect(normalized);
    } else {
      // Pick a random mood or stay as is
      const keys = Object.keys(moodPalettes) as Mood[];
      onMoodSelect(keys[Math.floor(Math.random() * keys.length)]);
    }
    setCustomMood('');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <form onSubmit={handleCustomSubmit} className="relative">
        <input 
          type="text" 
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          placeholder="How are you feeling?" 
          className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-center placeholder:text-zinc-400"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
        >
          Go
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {(Object.keys(moodPalettes) as Mood[]).map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentMood === mood 
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 scale-105 shadow-lg' 
                : 'bg-white/30 dark:bg-zinc-800/30 hover:bg-white/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-white/20'
            }`}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodInput;
