import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Wind, Anchor, BookOpen, Gamepad2, Brain } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

export const MentalWellnessMain: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'mood',
      title: 'Daily Mood Tracker',
      description: 'Log how you feel each day and track emotional patterns over time',
      icon: Heart,
      path: '/mental-wellness/mood',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Guided breathing sessions with 4-7-8 and box breathing techniques',
      icon: Wind,
      path: '/mental-wellness/breathing',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'grounding',
      title: 'Grounding Exercise',
      description: '5-4-3-2-1 technique to calm anxiety and center yourself',
      icon: Anchor,
      path: '/mental-wellness/grounding',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'journal',
      title: 'Private Journal',
      description: 'Safe space to write, reflect, and process your thoughts and feelings',
      icon: BookOpen,
      path: '/mental-wellness/journal',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      id: 'bubble-pop',
      title: 'Bubble Pop Game',
      description: 'Relaxing mindfulness game to help release stress and anxiety',
      icon: Gamepad2,
      path: '/mental-wellness/bubble-pop',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/" />
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Mental Wellness
          </h1>
          <p className="text-xl text-purple-700/80 max-w-2xl mx-auto leading-relaxed">
            Nurture your emotional well-being with tools designed for mindfulness, reflection, and peace
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <GlassCard
                key={feature.id}
                onClick={() => navigate(feature.path)}
                className={`p-6 text-center animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-purple-600/80 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};