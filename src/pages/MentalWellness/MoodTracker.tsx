import React, { useState, useEffect } from 'react';
import { Save, TrendingUp } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  anxiety: number;
  notes: string;
}

export const MoodTracker: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<MoodEntry>({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    energy: 5,
    anxiety: 5,
    notes: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    const existingIndex = entries.findIndex(entry => entry.date === currentEntry.date);
    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = currentEntry;
      setEntries(updated);
    } else {
      setEntries([...entries, currentEntry]);
    }
    
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 5,
      energy: 5,
      anxiety: 5,
      notes: ''
    });
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😔';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '🙂';
    return '😊';
  };

  const getEnergyColor = (energy: number) => {
    if (energy <= 3) return 'from-red-400 to-red-500';
    if (energy <= 6) return 'from-yellow-400 to-orange-500';
    return 'from-green-400 to-emerald-500';
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/mental-wellness" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Daily Mood Tracker
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Track your emotional patterns and identify trends in your mental wellness
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mood Entry Form */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">How are you feeling today?</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-purple-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={currentEntry.date}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">
                  Overall Mood: {getMoodEmoji(currentEntry.mood)} ({currentEntry.mood}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentEntry.mood}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-purple-600 mt-1">
                  <span>Very Low</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">
                  Energy Level: ({currentEntry.energy}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentEntry.energy}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-purple-600 mt-1">
                  <span>Exhausted</span>
                  <span>Energized</span>
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">
                  Anxiety Level: ({currentEntry.anxiety}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentEntry.anxiety}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, anxiety: parseInt(e.target.value) }))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-purple-600 mt-1">
                  <span>Very Calm</span>
                  <span>Very Anxious</span>
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Notes</label>
                <textarea
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="What's on your mind today?"
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Entry</span>
              </button>
            </div>
          </GlassCard>

          {/* Mood History & Trends */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Entries
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.slice(-7).reverse().map((entry, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-800">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="text-center">
                      <div className="text-xs text-purple-600">Mood</div>
                      <div className="font-semibold text-purple-800">{entry.mood}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-purple-600">Energy</div>
                      <div className="font-semibold text-purple-800">{entry.energy}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-purple-600">Anxiety</div>
                      <div className="font-semibold text-purple-800">{entry.anxiety}</div>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-purple-700 italic">"{entry.notes}"</p>
                  )}
                </div>
              ))}
              {entries.length === 0 && (
                <p className="text-purple-600/70 text-center py-8">
                  No mood entries yet. Start tracking your daily feelings!
                </p>
              )}
            </div>

            {entries.length > 0 && (
              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">Weekly Average</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xs text-purple-600">Mood</div>
                    <div className="font-semibold text-purple-800">
                      {(entries.slice(-7).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(entries.length, 7)).toFixed(1)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-purple-600">Energy</div>
                    <div className="font-semibold text-purple-800">
                      {(entries.slice(-7).reduce((sum, entry) => sum + entry.energy, 0) / Math.min(entries.length, 7)).toFixed(1)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-purple-600">Anxiety</div>
                    <div className="font-semibold text-purple-800">
                      {(entries.slice(-7).reduce((sum, entry) => sum + entry.anxiety, 0) / Math.min(entries.length, 7)).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};