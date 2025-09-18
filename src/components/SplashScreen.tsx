import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo animation
    setTimeout(() => setShowLogo(true), 500);
    
    // Show text animation
    setTimeout(() => setShowText(true), 1000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
      {/* Minimal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-200 rounded-full blur-2xl animate-float delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg mx-auto animate-pulse-soft">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* App Name Animation */}
        <div className={`transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            Womanism
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-8" style={{ fontFamily: 'Times New Roman, serif' }}>
            Empowering Women's Wellness
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 mx-auto">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-300 to-pink-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
            Loading your wellness journey...
          </p>
        </div>
      </div>
    </div>
  );
};