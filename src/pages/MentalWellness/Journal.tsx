import React, { useState, useEffect } from 'react';
import { Save, Edit3, Trash2, Plus, BookOpen, Lock } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: '',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: '😊'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string>('');
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [savedPin, setSavedPin] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    const savedPinCode = localStorage.getItem('journalPin');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    if (savedPinCode) {
      setSavedPin(savedPinCode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleUnlock = () => {
    if (savedPin === '') {
      // First time setup
      if (pin.length >= 4) {
        setSavedPin(pin);
        localStorage.setItem('journalPin', pin);
        setIsLocked(false);
        setPin('');
      }
    } else if (pin === savedPin) {
      setIsLocked(false);
      setPin('');
    }
  };

  const handleSave = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) return;

    if (isEditing) {
      setEntries(prev => prev.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
    } else {
      const newEntry = {
        ...currentEntry,
        id: Date.now().toString()
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCurrentEntry({
      id: '',
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      mood: '😊'
    });
    setIsEditing(false);
    setSelectedEntry('');
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
    setSelectedEntry(entry.id);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    if (selectedEntry === id) {
      resetForm();
    }
  };

  const moodOptions = ['😊', '🙂', '😐', '😔', '😢', '😍', '😤', '😴'];

  if (isLocked) {
    return (
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="mb-8">
            <BackButton to="/mental-wellness" />
          </div>

          <GlassCard className="p-8 text-center" hover={false}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              {savedPin === '' ? 'Set Your PIN' : 'Enter Your PIN'}
            </h2>
            <p className="text-purple-700 mb-6">
              {savedPin === '' 
                ? 'Create a 4-digit PIN to secure your private journal'
                : 'Enter your PIN to access your private journal'
              }
            </p>
            
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              className="w-full p-4 text-center text-2xl rounded-xl bg-white/20 border border-white/30 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
            />
            
            <button
              onClick={handleUnlock}
              disabled={pin.length < 4}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savedPin === '' ? 'Set PIN' : 'Unlock Journal'}
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <BackButton to="/mental-wellness" />
          <button
            onClick={() => setIsLocked(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-purple-700 rounded-full hover:bg-white/30 transition-colors duration-300"
          >
            <Lock className="w-4 h-4" />
            <span>Lock</span>
          </button>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Private Journal
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Your safe space for thoughts, reflections, and personal growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Journal Entry Form */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-800">
                {isEditing ? 'Edit Entry' : 'New Entry'}
              </h3>
              {isEditing && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-white/20 text-purple-700 rounded-xl hover:bg-white/30 transition-colors duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
            
            <div className="space-y-4">
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
                <label className="block text-purple-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's this entry about?"
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Mood</label>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, mood }))}
                      className={`p-3 text-2xl rounded-xl transition-all duration-300 ${
                        currentEntry.mood === mood
                          ? 'bg-purple-500 shadow-lg scale-110'
                          : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-700 font-medium mb-2">Content</label>
                <textarea
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your thoughts, feelings, or reflections..."
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={8}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!currentEntry.title.trim() || !currentEntry.content.trim()}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{isEditing ? 'Update Entry' : 'Save Entry'}</span>
              </button>
            </div>
          </GlassCard>

          {/* Journal Entries List */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-800">Your Entries</h3>
              <div className="text-purple-600 text-sm">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.map((entry) => (
                <div key={entry.id} className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedEntry === entry.id 
                    ? 'bg-purple-500/20 border-purple-500/30' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{entry.mood}</span>
                        <h4 className="font-semibold text-purple-800">{entry.title}</h4>
                      </div>
                      <p className="text-sm text-purple-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editEntry(entry)}
                        className="p-2 bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-purple-700 text-sm line-clamp-3">
                    {entry.content}
                  </p>
                </div>
              ))}
              {entries.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-600/70">
                    No journal entries yet. Start writing to capture your thoughts!
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};