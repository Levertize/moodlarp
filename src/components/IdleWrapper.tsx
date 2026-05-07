import React, { useState, useEffect, useCallback } from 'react';

interface IdleWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const IdleWrapper: React.FC<IdleWrapperProps> = ({ children, delay = 3000 }) => {
  const [isIdle, setIsIdle] = useState(false);

  const resetIdle = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timeoutId: number;

    const handleActivity = () => {
      resetIdle();
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsIdle(true), delay);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [delay, resetIdle]);

  return (
    <div className={`transition-opacity duration-1000 ${isIdle ? 'opacity-0 cursor-none' : 'opacity-100'}`}>
      {children}
    </div>
  );
};

export default IdleWrapper;
