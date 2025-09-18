import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Heart, Lightbulb } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface SymptomEntry {
  date: string;
  mood: string;
  flow: string;
  cramps: number;
  symptoms: string[];
  notes: string;
}

export const PeriodInsights: React.FC = () => {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [currentPhase, setCurrentPhase] = useState('follicular');

  useEffect(() => {
    const saved = localStorage.getItem('symptomEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const getPhaseInfo = (phase: string) => {
    const phases = {
      follicular: {
        title: 'Follicular Phase',
        description: 'Energy building phase (Days 1-13)',
        tips: [
          'Great time to start new projects',
          'Focus on strength training',
          'Eat iron-rich foods',
          'Stay hydrated'
        ],
        color: 'from-green-400 to-emerald-500'
      },
      ovulation: {
        title: 'Ovulation Phase',
        description: 'Peak energy phase (Days 14-16)',
        tips: [
          'Perfect for social activities',
          'High-intensity workouts work well',
          'Focus on communication',
          'Optimize nutrition'
        ],
        color: 'from-yellow-400 to-orange-500'
      },
      luteal: {
        title: 'Luteal Phase',
        description: 'Slow down phase (Days 17-28)',
        tips: [
          'Focus on self-care',
          'Gentle yoga and stretching',
          'Reduce caffeine intake',
          'Prioritize sleep'
        ],
        color: 'from-purple-400 to-pink-500'
      },
      menstrual: {
        title: 'Menstrual Phase',
        description: 'Rest and renewal (Days 1-5)',
        tips: [
          'Rest and gentle movement',
          'Use heat therapy for cramps',
          'Eat magnesium-rich foods',
          'Practice mindfulness'
        ],
        color: 'from-red-400 to-pink-500'
      }
    };
    return phases[phase as keyof typeof phases] || phases.follicular;
  };

  const calculateAverages = () => {
    if (entries.length === 0) return null;

    const avgCramps = entries.reduce((sum, entry) => sum + entry.cramps, 0) / entries.length;
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );

    return { avgCramps: avgCramps.toFixed(1), mostCommonMood };
  };

  const phaseInfo = getPhaseInfo(currentPhase);
  const averages = calculateAverages();

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/period-health" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Personalized Insights
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Understanding your cycle patterns and getting personalized wellness tips
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Phase */}
          <GlassCard className="p-6" hover={false}>
            <div className={`w-16 h-16 bg-gradient-to-r ${phaseInfo.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl`}>
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 text-center mb-2">
              {phaseInfo.title}
            </h3>
            <p className="text-purple-600 text-center mb-4">{phaseInfo.description}</p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-800 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Phase Tips
              </h4>
              {phaseInfo.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-purple-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-purple-700 font-medium mb-2">Change Phase</label>
              <select
                value={currentPhase}
                onChange={(e) => setCurrentPhase(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="follicular">Follicular</option>
                <option value="ovulation">Ovulation</option>
                <option value="luteal">Luteal</option>
                <option value="menstrual">Menstrual</option>
              </select>
            </div>
          </GlassCard>

          {/* Statistics */}
          <GlassCard className="p-6" hover={false}>
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 text-center mb-6">Your Stats</h3>
            
            {averages ? (
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800 text-center">
                    {averages.avgCramps}/10
                  </div>
                  <div className="text-purple-600 text-center text-sm">Average Cramp Intensity</div>
                </div>
                
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="text-lg font-bold text-purple-800 text-center">
                    {averages.mostCommonMood}
                  </div>
                  <div className="text-purple-600 text-center text-sm">Most Common Mood</div>
                </div>
                
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800 text-center">
                    {entries.length}
                  </div>
                  <div className="text-purple-600 text-center text-sm">Total Entries</div>
                </div>
              </div>
            ) : (
              <p className="text-purple-600/70 text-center py-8">
                Start logging symptoms to see your insights!
              </p>
            )}
          </GlassCard>

          {/* Health Tips */}
          <GlassCard className="p-6" hover={false}>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 text-center mb-6">Health Tips</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">💧 Hydration</h4>
                <p className="text-purple-700 text-sm">Drink 8-10 glasses of water daily to reduce bloating and cramps.</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">🥬 Nutrition</h4>
                <p className="text-purple-700 text-sm">Include iron-rich foods like spinach, lentils, and lean meats.</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">🧘 Exercise</h4>
                <p className="text-purple-700 text-sm">Light yoga and walking can help alleviate menstrual discomfort.</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">😴 Sleep</h4>
                <p className="text-purple-700 text-sm">Aim for 7-9 hours of quality sleep to support hormonal balance.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};