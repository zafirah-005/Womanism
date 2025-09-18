import React from 'react';
import { Heart, Shield, Brain, Users, Award, Target } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';

export const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Period Health',
      description: 'Comprehensive menstrual cycle tracking with personalized insights and wellness tips.'
    },
    {
      icon: Brain,
      title: 'Mental Wellness',
      description: 'Tools for emotional well-being including mood tracking, breathing exercises, and journaling.'
    },
    {
      icon: Shield,
      title: 'Safety Features',
      description: 'Emergency alert system with location sharing and trusted contact management.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Empowerment',
      description: 'We believe every woman deserves access to comprehensive wellness tools and information.'
    },
    {
      icon: Award,
      title: 'Privacy',
      description: 'Your personal data is secure and private. We use local storage to keep your information safe.'
    },
    {
      icon: Target,
      title: 'Holistic Care',
      description: 'Addressing physical, mental, and safety needs in one integrated platform.'
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
            <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            About Womanism
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
            Your trusted companion for comprehensive women's wellness, safety, and empowerment.
          </p>
        </div>

        {/* Mission Statement */}
        <GlassCard className="glass-card p-8 mb-8 text-center" hover={false}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
            Womanism is dedicated to empowering women through technology that supports their physical health, 
            mental well-being, and personal safety. We provide a safe, private, and comprehensive platform 
            where women can track their wellness journey, access emergency support, and find the tools they 
            need to thrive.
          </p>
        </GlassCard>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-8" style={{ fontFamily: 'Times New Roman, serif' }}>
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <GlassCard
                  key={index}
                  className={`glass-card p-6 text-center animate-slide-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  hover={false}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {feature.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-8" style={{ fontFamily: 'Times New Roman, serif' }}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <GlassCard
                  key={index}
                  className={`glass-card p-6 text-center animate-slide-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  hover={false}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {value.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Privacy & Security */}
        <GlassCard className="glass-card p-8 mb-8" hover={false}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            Privacy & Security
          </h2>
          <div className="space-y-4 text-gray-600" style={{ fontFamily: 'Times New Roman, serif' }}>
            <p>
              <strong>Local Data Storage:</strong> All your personal information is stored locally on your device. 
              We don't collect or store your data on external servers.
            </p>
            <p>
              <strong>Secure Journaling:</strong> Your private journal entries are protected with PIN security 
              and encrypted storage.
            </p>
            <p>
              <strong>Emergency Features:</strong> Location sharing and emergency alerts are only activated 
              when you choose to use them.
            </p>
            <p>
              <strong>No Tracking:</strong> We don't track your usage patterns or share your information 
              with third parties.
            </p>
          </div>
        </GlassCard>

        {/* Contact */}
        <GlassCard className="glass-card p-8 text-center" hover={false}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>
            We're here to support you on your wellness journey. If you have questions, feedback, 
            or need assistance, please don't hesitate to reach out.
          </p>
          <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Times New Roman, serif' }}>
            <p><strong>Email:</strong> support@womanism.app</p>
            <p><strong>Emergency:</strong> Always call local emergency services (911) for immediate help</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};