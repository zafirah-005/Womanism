import React, { useState, useEffect } from 'react';
import { MapPin, Share, Navigation, Phone, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

export const LocationSharing: React.FC = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          setError('');
        },
        (error) => {
          let errorMessage = 'Unable to get your location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied. Please enable location permissions in your browser settings and try again.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable. Please check your device settings.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage += 'Please enable location services and try again.';
              break;
          }
          
          setError(errorMessage);
          console.error('Error getting location:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const generateShareLink = () => {
    if (location) {
      const link = `https://maps.google.com/?q=${location.lat},${location.lng}`;
      setShareLink(link);
      setIsSharing(true);
      
      // Copy to clipboard
      navigator.clipboard.writeText(link).then(() => {
        alert('Location link copied to clipboard!');
      });
    }
  };

  const emergencyServices = [
    { name: 'Police Station', type: 'police', distance: '0.5 mi', phone: '911' },
    { name: 'General Hospital', type: 'hospital', distance: '1.2 mi', phone: '(555) 123-4567' },
    { name: 'Fire Department', type: 'fire', distance: '0.8 mi', phone: '911' },
    { name: 'Crisis Center', type: 'crisis', distance: '2.1 mi', phone: '(555) 987-6543' }
  ];

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'police': return '🚔';
      case 'hospital': return '🏥';
      case 'fire': return '🚒';
      case 'crisis': return '🆘';
      default: return '📍';
    }
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/safety" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Location Sharing
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Share your location and find nearby emergency services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Location Status */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">Your Location</h3>
            
            {error ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4 text-sm leading-relaxed">{error}</p>
                
                {error.includes('denied') && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
                    <h4 className="font-semibold text-blue-800 mb-2">How to enable location access:</h4>
                    <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                      <li>Click the location icon (🔒 or ℹ️) in your browser's address bar</li>
                      <li>Find "Location" in the permissions menu</li>
                      <li>Change the setting to "Allow"</li>
                      <li>Refresh the page or click "Try Again" below</li>
                    </ol>
                  </div>
                )}
                
                <button
                  onClick={getCurrentLocation}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg uppercase tracking-wide"
                >
                  Try Again
                </button>
              </div>
            ) : location ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-green-600 font-semibold mb-2">📍 Location Found</div>
                  <p className="text-purple-700 text-sm font-mono">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={generateShareLink}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Share className="w-5 h-5" />
                    <span>Share My Location</span>
                  </button>

                  <a
                    href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-white/20 text-purple-700 font-semibold rounded-xl hover:bg-white/30 transition-colors duration-300 border border-white/30 flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Open in Maps</span>
                  </a>

                  <button
                    onClick={getCurrentLocation}
                    className="w-full py-3 bg-white/20 text-purple-700 font-semibold rounded-xl hover:bg-white/30 transition-colors duration-300 border border-white/30"
                  >
                    Refresh Location
                  </button>
                </div>

                {isSharing && shareLink && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <p className="text-green-700 font-semibold mb-2">Location shared!</p>
                    <p className="text-green-600 text-sm mb-2">Link copied to clipboard:</p>
                    <p className="text-green-700 text-xs font-mono break-all">{shareLink}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-purple-600">Getting your location...</p>
              </div>
            )}
          </GlassCard>

          {/* Nearby Emergency Services */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">Nearby Emergency Services</h3>
            
            <div className="space-y-4">
              {emergencyServices.map((service, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getServiceIcon(service.type)}</span>
                      <div>
                        <h4 className="font-semibold text-purple-800">{service.name}</h4>
                        <p className="text-purple-600 text-sm">{service.distance} away</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${service.phone}`}
                      className="p-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 text-sm font-medium">
                      Get Directions
                    </button>
                    <button className="flex-1 py-2 bg-green-500/20 text-green-600 rounded-lg hover:bg-green-500/30 transition-colors duration-300 text-sm font-medium">
                      More Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 text-center" hover={false}>
            <h4 className="font-bold text-purple-800 mb-4">🚨 Emergency Call</h4>
            <a
              href="tel:911"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg block"
            >
              Call 911
            </a>
          </GlassCard>

          <GlassCard className="p-6 text-center" hover={false}>
            <h4 className="font-bold text-purple-800 mb-4">💬 Crisis Text</h4>
            <a
              href="sms:741741"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg block"
            >
              Text HOME to 741741
            </a>
          </GlassCard>

          <GlassCard className="p-6 text-center" hover={false}>
            <h4 className="font-bold text-purple-800 mb-4">🆘 Suicide Prevention</h4>
            <a
              href="tel:988"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg block"
            >
              Call 988
            </a>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};