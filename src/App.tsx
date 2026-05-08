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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<CanvasHandle>(null);

  const palette = useMemo(() => moodPalettes[mood], [mood]);

  const handleSave = () => {
    canvasRef.current?.save(mood);
  };

  const handleRegenerate = () => {
    canvasRef.current?.regenerate();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000 flex flex-col cursor-none"
      style={{ backgroundColor: palette.background }}
      onMouseMove={handleMouseMove}
    >
      <div className="grain" />
      
      {/* SVG Gooey Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed inset-0 -z-10"
        style={{ 
          filter: 'url(#goo)',
          transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, 0)`
        }}
      >
        <Canvas 
          ref={canvasRef}
          colors={palette.colors} 
          blobCount={mood === 'void' ? 4 : 8} 
        />
      </div>
      
      {/* Central Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10">
        <div 
          key={mood} 
          className="fade-in"
          style={{ 
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${mousePos.y * -0.5}deg) rotateY(${mousePos.x * 0.5}deg)`
          }}
        >
          <h1 className="mood-title text-[8rem] md:text-[14rem] font-black tracking-tighter mb-4 text-zinc-900 dark:text-white transition-colors leading-[0.8] mix-blend-difference">
            {palette.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto uppercase tracking-[0.3em]">
            {palette.description}
          </p>
        </div>
      </main>

      {/* Floating Bottom Dock */}
      <IdleWrapper delay={5000}>
        <div className="relative z-30 pb-12 px-4 flex flex-col items-center gap-8">
          <div className="glass-dock p-6 md:p-8 rounded-[3rem] w-full max-w-3xl transform transition-transform hover:scale-[1.02]">
            <MoodInput onMoodSelect={setMood} currentMood={mood} />
            
            <footer className="mt-8 flex justify-center gap-12 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              <button 
                onClick={handleSave}
                className="hover:text-zinc-900 dark:hover:text-white transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-500/30 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                </div>
                Snapshot
              </button>
              <button 
                onClick={handleRegenerate}
                className="hover:text-zinc-900 dark:hover:text-white transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-500/30 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                </div>
                Chaos
              </button>
            </footer>
          </div>
        </div>
      </IdleWrapper>
      
      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white mix-blend-difference pointer-events-none z-[100] transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${mousePos.x * 50 + (window.innerWidth / 2)}px, ${mousePos.y * 50 + (window.innerHeight / 2)}px, 0) scale(1.5)`,
          left: 0,
          top: 0
        }}
      />
    </div>
  );
}

export default App;
