import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Shield, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'period-health',
      title: 'Period Health',
      description: 'Track your cycle, log symptoms, and get personalized insights for your menstrual wellness journey.',
      icon: Heart,
      color: 'from-pink-400 to-rose-500',
      path: '/period-health'
    },
    {
      id: 'mental-wellness',
      title: 'Mental Wellness',
      description: 'Support your emotional well-being with mood tracking, breathing exercises, and mindfulness tools.',
      icon: Brain,
      color: 'from-purple-400 to-indigo-500',
      path: '/mental-wellness'
    },
    {
      id: 'safety',
      title: 'Safety',
      description: 'Stay protected with emergency features, location sharing, and trusted contact management.',
      icon: Shield,
      color: 'from-emerald-400 to-teal-500',
      path: '/safety'
    }
  ];

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6 leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            Your Wellness Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
            Empower yourself with comprehensive tools for period health, mental wellness, and safety. 
            Your personal sanctuary for holistic well-being.
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <GlassCard
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`p-8 text-center group animate-slide-up glass-card`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, serif' }}>
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  {section.description}
                </p>
                <div className="mt-6 inline-flex items-center text-pink-600 font-semibold transition-colors duration-300" style={{ fontFamily: 'Times New Roman, serif' }}>
                  <span>Explore</span>
                  <div className="ml-2 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Welcome Message */}
        <GlassCard className="p-8 text-center" hover={false}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>Welcome to Your Safe Space</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
            We believe every woman deserves access to comprehensive wellness tools. Whether you're tracking your cycle, 
            nurturing your mental health, or ensuring your safety, we're here to support you every step of the way.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};