import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, RotateCcw, Anchor } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface GroundingStep {
  number: number;
  sense: string;
  instruction: string;
  examples: string[];
  completed: boolean;
}

export const GroundingExercise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);
  
  const [steps, setSteps] = useState<GroundingStep[]>([
    {
      number: 5,
      sense: 'See',
      instruction: 'Name 5 things you can see around you',
      examples: ['The color of the walls', 'A piece of furniture', 'Something in the distance', 'The lighting in the room', 'An object nearby'],
      completed: false
    },
    {
      number: 4,
      sense: 'Touch',
      instruction: 'Name 4 things you can touch or feel',
      examples: ['The texture of your clothing', 'The temperature of the air', 'The surface you\'re sitting on', 'Something in your hands'],
      completed: false
    },
    {
      number: 3,
      sense: 'Hear',
      instruction: 'Name 3 things you can hear',
      examples: ['Sounds from outside', 'Your own breathing', 'Background noise or music'],
      completed: false
    },
    {
      number: 2,
      sense: 'Smell',
      instruction: 'Name 2 things you can smell',
      examples: ['The air around you', 'A scent in the room'],
      completed: false
    },
    {
      number: 1,
      sense: 'Taste',
      instruction: 'Name 1 thing you can taste',
      examples: ['The taste in your mouth', 'Take a sip of water and notice the taste'],
      completed: false
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('groundingSessions');
    if (saved) {
      setCompletedSessions(JSON.parse(saved));
    }
  }, []);

  const startExercise = () => {
    setIsActive(true);
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
  };

  const completeStep = () => {
    setSteps(prev => 
      prev.map((step, index) => 
        index === currentStep ? { ...step, completed: true } : step
      )
    );
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 1000);
    } else {
      // Exercise completed
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const updatedSessions = [...completedSessions, today];
        setCompletedSessions(updatedSessions);
        localStorage.setItem('groundingSessions', JSON.stringify(updatedSessions));
        setIsActive(false);
      }, 1000);
    }
  };

  const reset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
  };

  const currentStepData = steps[currentStep];
  const isCompleted = steps.every(step => step.completed);

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/mental-wellness" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <Anchor className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            5-4-3-2-1 Grounding
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Ground yourself in the present moment using your five senses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Exercise Interface */}
          <GlassCard className="p-8 text-center" hover={false}>
            {!isActive ? (
              <div className="space-y-6">
                <div className="w-32 h-32 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full flex items-center justify-center mx-auto border-4 border-white/30">
                  <div className="text-4xl font-bold text-green-600">5-4-3-2-1</div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800">Ready to Ground Yourself?</h3>
                <p className="text-purple-700">
                  This exercise will help you reconnect with the present moment through your senses.
                </p>
                <button
                  onClick={startExercise}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Exercise</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-32 h-32 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full flex items-center justify-center mx-auto border-4 border-white/30 relative">
                  <div className="text-6xl font-bold text-green-600">
                    {currentStepData?.number || '✓'}
                  </div>
                  {currentStepData?.completed && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {!isCompleted ? (
                  <>
                    <h3 className="text-2xl font-bold text-purple-800">
                      {currentStepData?.sense}
                    </h3>
                    <p className="text-lg text-purple-700">
                      {currentStepData?.instruction}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-purple-600 font-medium">Examples:</p>
                      {currentStepData?.examples.map((example, index) => (
                        <div key={index} className="text-purple-700 text-sm">
                          • {example}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={completeStep}
                      disabled={currentStepData?.completed}
                      className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                        currentStepData?.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-xl'
                      }`}
                    >
                      {currentStepData?.completed ? 'Completed!' : 'I\'ve Found Them'}
                    </button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="text-6xl">🌟</div>
                    <h3 className="text-2xl font-bold text-purple-800">Exercise Complete!</h3>
                    <p className="text-purple-700">
                      Great job! You've successfully grounded yourself in the present moment.
                    </p>
                    <button
                      onClick={reset}
                      className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Try Again</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {/* Progress & Information */}
          <div className="space-y-6">
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Your Progress</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      index === currentStep && isActive 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : step.completed 
                          ? 'bg-green-500/10' 
                          : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep && isActive
                          ? 'bg-green-400 text-white'
                          : 'bg-white/20 text-purple-700'
                    }`}>
                      {step.completed ? '✓' : step.number}
                    </div>
                    <div>
                      <div className="font-medium text-purple-800">{step.sense}</div>
                      <div className="text-sm text-purple-600">{step.instruction}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Session History</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600">
                  {completedSessions.length}
                </div>
                <div className="text-purple-600">Completed Sessions</div>
              </div>
              
              {completedSessions.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {completedSessions.slice(-5).reverse().map((date, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                      <span className="text-purple-700 text-sm">
                        {new Date(date).toLocaleDateString()}
                      </span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">About Grounding</h3>
              <p className="text-purple-700 text-sm leading-relaxed">
                The 5-4-3-2-1 technique is a simple but powerful grounding exercise that helps bring your attention 
                to the present moment. It's particularly useful during moments of anxiety, stress, or when you feel 
                overwhelmed. By engaging all five senses, you anchor yourself in the here and now.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};