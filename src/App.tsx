import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { PeriodHealthMain } from './pages/PeriodHealth/PeriodHealthMain';
import { CalendarTracker } from './pages/PeriodHealth/CalendarTracker';
import { SymptomLogger } from './pages/PeriodHealth/SymptomLogger';
import { PeriodHealthGuide } from './pages/PeriodHealth/PeriodHealthGuide';
import { PeriodInsights } from './pages/PeriodHealth/PeriodInsights';
import { MentalWellnessMain } from './pages/MentalWellness/MentalWellnessMain';
import { MoodTracker } from './pages/MentalWellness/MoodTracker';
import { BreathingExercise } from './pages/MentalWellness/BreathingExercise';
import { GroundingExercise } from './pages/MentalWellness/GroundingExercise';
import { Journal } from './pages/MentalWellness/Journal';
import { BubblePop } from './pages/MentalWellness/BubblePop';
import { SafetyMain } from './pages/Safety/SafetyMain';
import { PanicButton } from './pages/Safety/PanicButton';
import { EmergencyContacts } from './pages/Safety/EmergencyContacts';
import { LocationSharing } from './pages/Safety/LocationSharing';
import { About } from './pages/About';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white relative">
        {/* Minimal background pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-200 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <Navigation />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Period Health Routes */}
            <Route path="/period-health" element={<PeriodHealthMain />} />
            <Route path="/period-health/calendar" element={<CalendarTracker />} />
            <Route path="/period-health/symptoms" element={<SymptomLogger />} />
            <Route path="/period-health/guide" element={<PeriodHealthGuide />} />
            <Route path="/period-health/insights" element={<PeriodInsights />} />
            
            {/* Mental Wellness Routes */}
            <Route path="/mental-wellness" element={<MentalWellnessMain />} />
            <Route path="/mental-wellness/mood" element={<MoodTracker />} />
            <Route path="/mental-wellness/breathing" element={<BreathingExercise />} />
            <Route path="/mental-wellness/grounding" element={<GroundingExercise />} />
            <Route path="/mental-wellness/journal" element={<Journal />} />
            <Route path="/mental-wellness/bubble-pop" element={<BubblePop />} />
            
            {/* Safety Routes */}
            <Route path="/safety" element={<SafetyMain />} />
            <Route path="/safety/panic" element={<PanicButton />} />
            <Route path="/safety/contacts" element={<EmergencyContacts />} />
            <Route path="/safety/location" element={<LocationSharing />} />
            
            {/* About Route */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;