import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Star, Gamepad2 } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export const BubblePop: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 second game timer
  const [gameStats, setGameStats] = useState<number[]>([]);

  const colors = [
    'from-pink-400 to-rose-500',
    'from-purple-400 to-indigo-500',
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('bubblePopStats');
    if (saved) {
      setGameStats(JSON.parse(saved));
    }
  }, []);

  const createBubble = useCallback((): Bubble => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 80 + 10, // 10% to 90% from left
      y: 100, // Start from bottom
      size: Math.random() * 40 + 20, // 20px to 60px
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1 // 1 to 3 units per frame
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    // Game timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const interval = setInterval(() => {
      // Add new bubble occasionally
      if (Math.random() < 0.4) {
        setBubbles(prev => [...prev, createBubble()]);
      }

      // Move bubbles up and remove off-screen ones
      setBubbles(prev => 
        prev
          .map(bubble => ({ ...bubble, y: bubble.y - bubble.speed }))
          .filter(bubble => bubble.y > -100)
      );
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, [isPlaying, createBubble]);

  const popBubble = (id: string) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setBubbles([]);
  };

  const endGame = () => {
    setIsPlaying(false);
    const updatedStats = [...gameStats, score];
    setGameStats(updatedStats);
    localStorage.setItem('bubblePopStats', JSON.stringify(updatedStats));
    setBubbles([]);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(60);
    setBubbles([]);
  };

  const bestScore = gameStats.length > 0 ? Math.max(...gameStats) : 0;
  const averageScore = gameStats.length > 0 ? (gameStats.reduce((a, b) => a + b, 0) / gameStats.length).toFixed(1) : '0';

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/mental-wellness" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Bubble Pop Therapy
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Pop bubbles to release stress and find your calm
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <GlassCard className="relative overflow-hidden" hover={false} style={{ height: '500px' }}>
              {/* Game Controls */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
                <div className="text-2xl font-bold text-purple-800">
                  <div>Score: {score}</div>
                  {isPlaying && <div className="text-lg">Time: {timeLeft}s</div>}
                </div>
                <div className="flex space-x-2">
                  {!isPlaying ? (
                    <button
                      onClick={startGame}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                    >
                      Start Game
                    </button>
                  ) : (
                    <button
                      onClick={endGame}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                    >
                      End Game
                    </button>
                  )}
                  <button
                    onClick={resetGame}
                    className="p-2 bg-white/20 text-purple-700 rounded-xl hover:bg-white/30 transition-colors duration-300"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Area */}
              <div className="relative w-full h-full">
                {bubbles.map(bubble => (
                  <div
                    key={bubble.id}
                    className={`absolute bg-gradient-to-r ${bubble.color} rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg animate-bounce-gentle`}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => popBubble(bubble.id)}
                  />
                ))}

                {!isPlaying && bubbles.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4 animate-bounce">🫧</div>
                      <p className="text-purple-600 text-lg">
                        Click "Start Game" to begin popping bubbles!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Stats and Info */}
          <div className="space-y-6">
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Your Stats
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">{score}</div>
                  <div className="text-purple-600 text-sm">Current Score</div>
                </div>
                
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">{bestScore}</div>
                  <div className="text-purple-600 text-sm">Best Score</div>
                </div>
                
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">{averageScore}</div>
                  <div className="text-purple-600 text-sm">Average Score</div>
                </div>
                
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">{gameStats.length}</div>
                  <div className="text-purple-600 text-sm">Games Played</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-lg font-bold text-purple-800 mb-4">How to Play</h3>
              <div className="space-y-3 text-purple-700 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p>Click or tap bubbles to pop them</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p>Each bubble popped increases your score</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p>Focus on the present moment</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                  <p>Let stress float away with each pop</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-lg font-bold text-purple-800 mb-4">Mindfulness Benefits</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 text-sm mb-1">🧘 Present Moment</h4>
                  <p className="text-purple-700 text-xs">Helps anchor your attention in the now</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 text-sm mb-1">😌 Stress Relief</h4>
                  <p className="text-purple-700 text-xs">Provides a playful outlet for tension</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 text-sm mb-1">🎯 Focus</h4>
                  <p className="text-purple-700 text-xs">Improves concentration and coordination</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};