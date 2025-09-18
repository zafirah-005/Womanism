import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Shield } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { GlassCard } from '../../components/GlassCard';

export const PanicButton: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isActivated) {
      handleEmergencyAlert();
    }
  }, [countdown, isActivated]);

  const handlePanicPress = () => {
    setIsActivated(true);
    setCountdown(5);
    getCurrentLocation();
  };

  const handleCancel = () => {
    setIsActivated(false);
    setCountdown(0);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleEmergencyAlert = () => {
    const emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    const message = `EMERGENCY ALERT: I need help! ${location ? `My location: https://maps.google.com/?q=${location.lat},${location.lng}` : 'Location unavailable'}`;
    
    // In a real app, this would send SMS/calls to emergency contacts
    console.log('Emergency alert sent:', message);
    alert('Emergency alert has been sent to your emergency contacts!');
    
    // Save to emergency history
    const history = JSON.parse(localStorage.getItem('emergencyHistory') || '[]');
    history.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      location: location,
      type: 'panic_button'
    });
    localStorage.setItem('emergencyHistory', JSON.stringify(history));
    
    setIsActivated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <BackButton />
      
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EMERGENCY ALERT</h1>
          <p className="text-gray-600">Press and hold the button below in case of emergency</p>
        </div>

        <GlassCard className="text-center p-8 mb-6">
          {!isActivated ? (
            <div>
              <button
                onMouseDown={handlePanicPress}
                className="w-48 h-48 bg-gradient-to-br from-red-400 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto mb-6"
              >
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-white mb-2 mx-auto" />
                  <span className="text-white font-bold text-xl">SOS</span>
                </div>
              </button>
              <p className="text-gray-600 text-sm">Press to activate emergency alert</p>
            </div>
          ) : (
            <div>
              <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-white mb-2 mx-auto" />
                  <span className="text-white font-bold text-3xl">{countdown}</span>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-colors duration-200"
              >
                CANCEL
              </button>
              <p className="text-red-600 font-bold mt-4">Emergency alert will be sent in {countdown} seconds</p>
            </div>
          )}
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-pink-400" />
              <div>
                <h3 className="font-bold text-gray-800">Quick Call</h3>
                <p className="text-gray-600 text-sm">Call emergency services directly</p>
              </div>
              <button className="ml-auto bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200">
                CALL 911
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-pink-400" />
              <div>
                <h3 className="font-bold text-gray-800">Share Location</h3>
                <p className="text-gray-600 text-sm">Send your current location to contacts</p>
              </div>
              <button 
                onClick={getCurrentLocation}
                className="ml-auto bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200"
              >
                SHARE
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Your safety is our priority. This feature will alert your emergency contacts with your location.
          </p>
        </div>
      </div>
    </div>
  );
};