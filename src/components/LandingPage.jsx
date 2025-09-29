import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  ArrowRightIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import ChatBot from './ChatBot';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '10,000+', label: 'Lives Saved', icon: HeartIcon },
    { number: '5,000+', label: 'Active Donors', icon: UserGroupIcon },
    { number: '200+', label: 'Partner Hospitals', icon: ShieldCheckIcon },
    { number: '24/7', label: 'Emergency Support', icon: ClockIcon },
  ];

  const features = [
    {
      title: 'Easy Registration',
      description: 'Simple and quick registration process for donors with secure profile management.',
      icon: UserGroupIcon
    },
    {
      title: 'Real-time Requests',
      description: 'Instant notifications for blood requests matching your blood type and location.',
      icon: ClockIcon
    },
    {
      title: 'Secure & Private',
      description: 'Your personal and medical information is protected with enterprise-level security.',
      icon: ShieldCheckIcon
    },
    {
      title: 'Track Impact',
      description: 'Monitor your donation history and see the lives you\'ve helped save.',
      icon: HeartIcon
    }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <HeartIcon className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-red-600">BloodConnect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">About</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save Lives with Every
              <span className="block text-red-200">Drop of Blood</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
              Join our life-saving community of blood donors and help patients in need. 
              Your donation can save up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/register/donor')}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Become a Donor
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => navigate('/register/hospital')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all"
              >
                I'm a Hospital Staff
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BloodConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines blood donation management with cutting-edge technology 
              and a user-friendly experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-shadow animate-fade-in-up">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Blood Types Needed
            </h2>
            <p className="text-xl text-gray-600">
              Every blood type is precious and can save lives
            </p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {bloodTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-red-600 mb-2">{type}</div>
                <div className="text-sm text-gray-600">Blood Type</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start saving lives
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Register</h3>
              <p className="text-gray-600">
                Create your donor profile with basic information and health details
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Notified</h3>
              <p className="text-gray-600">
                Receive notifications when your blood type is needed in your area
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Donate</h3>
              <p className="text-gray-600">
                Visit the nearest center and help save lives with your donation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Join thousands of heroes who are already saving lives. 
            Your next donation could be someone's second chance at life.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg animate-pulse"
          >
            Start Saving Lives Today
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <PhoneIcon className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Hotline</h3>
              <p className="text-gray-600">+1 (555) 123-BLOOD</p>
            </div>
            <div className="text-center">
              <MapPinIcon className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Main Office</h3>
              <p className="text-gray-600">123 Healthcare Ave<br />Medical District, NY 10001</p>
            </div>
            <div className="text-center">
              <CheckCircleIcon className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">support@bloodconnect.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <HeartIcon className="h-8 w-8 text-red-400" />
              <span className="ml-2 text-xl font-bold">BloodConnect</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2025 BloodConnect. Saving lives, one donation at a time.</p>
              <div className="flex space-x-6 justify-center md:justify-end mt-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default LandingPage;