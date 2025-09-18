import React, { useState, useEffect } from 'react';
import { Save, Plus } from 'lucide-react';
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

export const SymptomLogger: React.FC = () => {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<SymptomEntry>({
    date: new Date().toISOString().split('T')[0],
    mood: '',
    flow: '',
    cramps: 0,
    symptoms: [],
    notes: ''
  });

  const moodOptions = ['😊 Great', '🙂 Good', '😐 Okay', '😔 Low', '😢 Difficult'];
  const flowOptions = ['None', 'Spotting', 'Light', 'Medium', 'Heavy'];
  const symptomOptions = ['Headache', 'Bloating', 'Tender Breasts', 'Fatigue', 'Mood Swings', 'Back Pain', 'Acne'];

  useEffect(() => {
    const saved = localStorage.getItem('symptomEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('symptomEntries', JSON.stringify(entries));
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
    
    // Reset form
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      mood: '',
      flow: '',
      cramps: 0,
      symptoms: [],
      notes: ''
    });
  };

  const toggleSymptom = (symptom: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/period-health" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Symptom Logger
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Track your daily symptoms and feelings throughout your cycle
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Entry Form */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">Log Today's Symptoms</h3>
            
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
                <label className="block text-purple-700 font-medium mb-2">Mood</label>
                <div className="grid grid-cols-2 gap-2">
                  {moodOptions.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, mood }))}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentEntry.mood === mood
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-white/20 text-purple-700 hover:bg-white/30'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Flow</label>
                <div className="grid grid-cols-3 gap-2">
                  {flowOptions.map(flow => (
                    <button
                      key={flow}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, flow }))}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentEntry.flow === flow
                          ? 'bg-pink-500 text-white shadow-lg'
                          : 'bg-white/20 text-purple-700 hover:bg-white/30'
                      }`}
                    >
                      {flow}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">
                  Cramps (0-10): {currentEntry.cramps}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={currentEntry.cramps}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, cramps: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Symptoms</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentEntry.symptoms.includes(symptom)
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-white/20 text-purple-700 hover:bg-white/30'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Notes</label>
                <textarea
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How are you feeling today?"
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Entry</span>
              </button>
            </div>
          </GlassCard>

          {/* Recent Entries */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">Recent Entries</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-800">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-purple-600">{entry.mood}</span>
                  </div>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>Flow: {entry.flow}</p>
                    <p>Cramps: {entry.cramps}/10</p>
                    {entry.symptoms.length > 0 && (
                      <p>Symptoms: {entry.symptoms.join(', ')}</p>
                    )}
                    {entry.notes && <p className="italic">"{entry.notes}"</p>}
                  </div>
                </div>
              ))}
              {entries.length === 0 && (
                <p className="text-purple-600/70 text-center py-8">
                  No entries yet. Start logging your symptoms!
                </p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};