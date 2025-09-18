import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [technique, setTechnique] = useState<'478' | 'box'>('478');

  const techniques = {
    '478': { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    'box': { inhale: 4, hold: 4, exhale: 4, pause: 4 }
  };

  const currentTechnique = techniques[technique];
  const maxCount = currentTechnique[phase];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev >= maxCount - 1) {
            // Move to next phase
            if (phase === 'inhale') setPhase('hold');
            else if (phase === 'hold') setPhase('exhale');
            else if (phase === 'exhale') {
              if (technique === 'box') setPhase('pause');
              else {
                setPhase('inhale');
                setCycle(c => c + 1);
              }
            }
            else if (phase === 'pause') {
              setPhase('inhale');
              setCycle(c => c + 1);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, maxCount, technique]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(0);
    setCycle(0);
  };

  const getPhaseInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  const getCircleScale = () => {
    const progress = (count + 1) / maxCount;
    if (phase === 'inhale') return 0.5 + (progress * 0.5);
    if (phase === 'exhale') return 1 - (progress * 0.5);
    return phase === 'hold' ? 1 : 0.5;
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/mental-wellness" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <Wind className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Breathing Exercises
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Find your calm with guided breathing techniques
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Breathing Circle */}
          <GlassCard className="p-8 text-center" hover={false}>
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setTechnique('478')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    technique === '478' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/20 text-purple-700 hover:bg-white/30'
                  }`}
                >
                  4-7-8 Technique
                </button>
                <button
                  onClick={() => setTechnique('box')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    technique === 'box' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/20 text-purple-700 hover:bg-white/30'
                  }`}
                >
                  Box Breathing
                </button>
              </div>

              <div className="relative flex items-center justify-center mb-8">
                <div 
                  className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-1000 ease-in-out shadow-2xl"
                  style={{ transform: `scale(${getCircleScale()})` }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-800 mb-2">
                      {getPhaseInstructions()}
                    </div>
                    <div className="text-4xl font-bold text-blue-600">
                      {maxCount - count}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isActive ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={reset}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-purple-700 font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-purple-800 mb-2">
                Cycle {cycle + 1}
              </div>
              <div className="text-purple-600">
                {technique === '478' ? 'Inhale 4 • Hold 7 • Exhale 8' : 'Inhale 4 • Hold 4 • Exhale 4 • Pause 4'}
              </div>
            </div>
          </GlassCard>

          {/* Instructions & Benefits */}
          <div className="space-y-6">
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Instructions</h3>
              <div className="space-y-3 text-purple-700">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                  <p>Find a comfortable seated position</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                  <p>Close your eyes or soften your gaze</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                  <p>Follow the circle and breathing prompts</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                  <p>Continue for 5-10 cycles for best results</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Benefits</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-1">🧘 Reduces Anxiety</h4>
                  <p className="text-purple-700 text-sm">Activates your body's relaxation response</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-1">💤 Improves Sleep</h4>
                  <p className="text-purple-700 text-sm">Helps calm your mind for better rest</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-1">🎯 Enhances Focus</h4>
                  <p className="text-purple-700 text-sm">Improves concentration and mental clarity</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-1">❤️ Lowers Stress</h4>
                  <p className="text-purple-700 text-sm">Reduces cortisol and stress hormones</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};