import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Brain, Shield, Menu, X, Info } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/period-health', icon: Heart, label: 'Period Health' },
    { path: '/mental-wellness', icon: Brain, label: 'Mental Wellness' },
    { path: '/safety', icon: Shield, label: 'Safety' },
    { path: '/about', icon: Info, label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-700" style={{ fontFamily: 'Times New Roman, serif' }}>
              Womanism
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-item flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === path || location.pathname.startsWith(path + '/')
                    ? 'active bg-pink-50 text-pink-600 shadow-sm'
                    : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
                }`}
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full bg-pink-50 text-gray-600 hover:bg-pink-100 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === path || location.pathname.startsWith(path + '/')
                    ? 'active bg-pink-50 text-pink-600 shadow-sm'
                    : 'text-gray-500 hover:bg-pink-50'
                }`}
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};