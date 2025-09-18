import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface PeriodData {
  [key: string]: {
    isPeriod: boolean;
    isOvulation: boolean;
    flow?: 'light' | 'medium' | 'heavy';
  };
}

export const CalendarTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodData, setPeriodData] = useState<PeriodData>({});
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('periodData');
    if (saved) {
      setPeriodData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('periodData', JSON.stringify(periodData));
  }, [periodData]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const togglePeriodDay = (dateKey: string) => {
    setPeriodData(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        isPeriod: !prev[dateKey]?.isPeriod
      }
    }));
  };

  const setFlow = (dateKey: string, flow: 'light' | 'medium' | 'heavy') => {
    setPeriodData(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        isPeriod: true,
        flow
      }
    }));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <div key={day} className="p-2 text-center text-purple-600 font-semibold text-sm">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const dayData = periodData[dateKey];
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateKey)}
          className={`
            p-2 text-center cursor-pointer rounded-xl transition-all duration-300 relative
            ${isToday ? 'ring-2 ring-purple-400' : ''}
            ${dayData?.isPeriod ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg' : 'hover:bg-white/20'}
            ${selectedDate === dateKey ? 'ring-2 ring-purple-500' : ''}
          `}
        >
          <span className="text-sm font-medium">{day}</span>
          {dayData?.isPeriod && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/period-health" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Cycle Calendar
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Track your periods and monitor your cycle patterns
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                >
                  <Minus className="w-5 h-5 text-purple-700" />
                </button>
                <h2 className="text-2xl font-bold text-purple-800">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                >
                  <Plus className="w-5 h-5 text-purple-700" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </GlassCard>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-xl font-bold text-purple-800 mb-4">Quick Actions</h3>
              {selectedDate ? (
                <div className="space-y-4">
                  <p className="text-purple-700 mb-4">
                    Selected: {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => togglePeriodDay(selectedDate)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      periodData[selectedDate]?.isPeriod
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                        : 'bg-white/20 text-purple-700 hover:bg-white/30'
                    }`}
                  >
                    {periodData[selectedDate]?.isPeriod ? 'Remove Period' : 'Mark Period'}
                  </button>
                  
                  {periodData[selectedDate]?.isPeriod && (
                    <div className="space-y-2">
                      <p className="text-sm text-purple-600 font-medium">Flow Intensity:</p>
                      {['light', 'medium', 'heavy'].map(flow => (
                        <button
                          key={flow}
                          onClick={() => setFlow(selectedDate, flow as any)}
                          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                            periodData[selectedDate]?.flow === flow
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/20 text-purple-700 hover:bg-white/30'
                          }`}
                        >
                          {flow.charAt(0).toUpperCase() + flow.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-purple-600/70 text-center">
                  Select a date to mark your period
                </p>
              )}
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h3 className="text-lg font-bold text-purple-800 mb-4">Cycle Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">This Month</span>
                  <span className="font-semibold text-purple-800">
                    {Object.keys(periodData).filter(key => 
                      key.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`) && 
                      periodData[key]?.isPeriod
                    ).length} days
                  </span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (Object.keys(periodData).filter(key => 
                      key.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`) && 
                      periodData[key]?.isPeriod
                    ).length / 7) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};