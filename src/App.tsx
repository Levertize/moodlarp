import { useState, useMemo, useRef } from 'react';
import Canvas from './components/Canvas';
import type { CanvasHandle } from './components/Canvas';
import MoodInput from './components/MoodInput';
import IdleWrapper from './components/IdleWrapper';
import type { Mood } from './types';
import { moodPalettes } from './utils/moodPalettes';
import './App.css';

function App() {
  const [mood, setMood] = useState<Mood>('euphoria');
  const canvasRef = useRef<CanvasHandle>(null);

  const palette = useMemo(() => moodPalettes[mood], [mood]);

  const handleSave = () => {
    canvasRef.current?.save(mood);
  };

  const handleRegenerate = () => {
    canvasRef.current?.regenerate();
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: palette.background }}
    >
      <Canvas 
        ref={canvasRef}
        colors={palette.colors} 
        blobCount={mood === 'void' ? 4 : 8} 
      />
      
      <IdleWrapper delay={5000}>
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-2xl max-w-xl w-full">
            <header className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white transition-colors">
                Mood Universe
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Transform your mood into a living universe of color.
              </p>
            </header>
            
            <MoodInput onMoodSelect={setMood} currentMood={mood} />
            
            <footer className="mt-8 flex justify-center gap-6 text-sm font-medium text-zinc-500">
              <button 
                onClick={handleSave}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Save Wallpaper
              </button>
              <span className="opacity-20">|</span>
              <button 
                onClick={handleRegenerate}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Regenerate
              </button>
            </footer>
          </div>
        </main>
      </IdleWrapper>
    </div>
  );
}

export default App;
