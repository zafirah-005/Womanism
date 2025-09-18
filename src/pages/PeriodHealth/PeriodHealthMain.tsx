import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, TrendingUp, Heart, BookOpen } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

export const PeriodHealthMain: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'calendar',
      title: 'Cycle Calendar',
      description: 'Track your periods, predict ovulation, and monitor your cycle patterns',
      icon: Calendar,
      path: '/period-health/calendar',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'symptoms',
      title: 'Symptom Logger',
      description: 'Log daily symptoms, flow intensity, and how you feel throughout your cycle',
      icon: FileText,
      path: '/period-health/symptoms',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'insights',
      title: 'Personalized Insights',
      description: 'Get cycle phase tips, wellness recommendations, and health insights',
      icon: TrendingUp,
      path: '/period-health/insights',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'guide',
      title: 'Period Health Guide',
      description: 'Comprehensive educational guide with bilingual support (English/Hindi)',
      icon: BookOpen,
      path: '/period-health/guide',
      color: 'from-emerald-400 to-teal-500'
    }
  ];

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/" />
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Period Health
          </h1>
          <p className="text-xl text-purple-700/80 max-w-2xl mx-auto leading-relaxed">
            Take control of your menstrual health with comprehensive tracking and personalized insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <GlassCard
                key={feature.id}
                onClick={() => navigate(feature.path)}
                className={`p-6 text-center animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
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