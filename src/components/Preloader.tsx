import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onLoaded?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth simulated increment
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 500);

      const hideTimer = setTimeout(() => {
        setIsDone(true);
        if (onLoaded) {
          onLoaded();
        }
      }, 1350);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onLoaded]);

  if (isDone) return null;

  return (
    <div className={`preloader-container ${isFading ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo-wrapper">
          <div className="preloader-glow" />
          <img src="/logo.png" alt="HAXON" className="preloader-logo" />
        </div>

        <div className="preloader-progress-section">
          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="preloader-meta">
            <span className="preloader-tagline">HAXON FOOTWEAR</span>
            <span className="preloader-counter">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
