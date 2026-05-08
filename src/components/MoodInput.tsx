import React, { useState } from 'react';
import type { Mood } from '../types';
import { moodPalettes } from '../utils/moodPalettes';
import { matchMood } from '../utils/moodMatcher';

interface MoodInputProps {
  onMoodSelect: (mood: Mood) => void;
  currentMood: Mood;
}

const MoodInput: React.FC<MoodInputProps> = ({ onMoodSelect, currentMood }) => {
  const [customMood, setCustomMood] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if exact match
    const normalized = customMood.toLowerCase() as Mood;
    if (moodPalettes[normalized]) {
      onMoodSelect(normalized);
      return;
    }

    // Use keyword matcher
    const matched = matchMood(customMood);
    if (matched) {
      onMoodSelect(matched);
    } else {
      // Pick a random mood if no match
      const keys = Object.keys(moodPalettes) as Mood[];
      onMoodSelect(keys[Math.floor(Math.random() * keys.length)]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <form onSubmit={handleCustomSubmit} className="relative group">
        <input 
          type="text" 
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          placeholder="How are you feeling?" 
          className="w-full px-8 py-5 rounded-3xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all text-center placeholder:text-zinc-500 text-lg font-medium text-zinc-800 dark:text-zinc-200"
        />
        <button 
          type="submit"
          className="absolute right-3 top-3 bottom-3 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all text-sm shadow-xl"
        >
          GO
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-3">
        {(Object.keys(moodPalettes) as Mood[]).map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
              currentMood === mood 
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 scale-110 shadow-2xl z-10' 
                : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 border border-white/10'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodInput;
