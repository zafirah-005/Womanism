import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Users, MapPin, Shield } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

export const SafetyMain: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'panic',
      title: 'Panic Button',
      description: 'Emergency alert system with location sharing to trusted contacts',
      icon: AlertTriangle,
      path: '/safety/panic',
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      description: 'Manage your trusted contacts for emergency situations',
      icon: Users,
      path: '/safety/contacts',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'location',
      title: 'Location Sharing',
      description: 'Share your live location and find nearby emergency services',
      icon: MapPin,
      path: '/safety/location',
      color: 'from-green-400 to-emerald-500'
    }
  ];

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/" />
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Safety Center
          </h1>
          <p className="text-xl text-purple-700/80 max-w-2xl mx-auto leading-relaxed">
            Your personal safety toolkit with emergency features and location services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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

        {/* Safety Tips */}
        <div className="mt-12">
          <GlassCard className="p-8" hover={false}>
            <h3 className="text-2xl font-bold text-purple-800 text-center mb-6">Safety Tips</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-purple-800 mb-2">Stay Connected</h4>
                <p className="text-purple-700 text-sm">Keep your phone charged and share your location with trusted contacts</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <h4 className="font-semibold text-purple-800 mb-2">Know Your Route</h4>
                <p className="text-purple-700 text-sm">Plan your route and share it with someone you trust</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-semibold text-purple-800 mb-2">Trust Your Instincts</h4>
                <p className="text-purple-700 text-sm">If something feels wrong, trust your gut and seek help</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">🚨</div>
                <h4 className="font-semibold text-purple-800 mb-2">Emergency Numbers</h4>
                <p className="text-purple-700 text-sm">Keep emergency contacts easily accessible in your phone</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};