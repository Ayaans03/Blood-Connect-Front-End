import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DonorProfile from './donor/DonorProfile';
import DonorNotifications from './donor/DonorNotifications';
import DonationHistory from './donor/DonationHistory'; // ADD THIS IMPORT
import { 
  HeartIcon, 
  BellIcon, 
  UserIcon, 
  ChartBarIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const DonorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'notifications', name: 'Blood Requests', icon: BellIcon, count: 5 },
    { id: 'profile', name: 'My Profile', icon: UserIcon },
    { id: 'history', name: 'Donation History', icon: ChartBarIcon },
  ];

  const stats = [
    { label: 'Total Donations', value: '12', change: '+2 this year' },
    { label: 'Lives Impacted', value: '36', change: '3 lives per donation' },
    { label: 'Last Donation', value: '45 days ago', change: 'Eligible to donate' },
    { label: 'Blood Type', value: user?.blood_group || 'O+', change: 'Most needed type' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <DonorProfile />;
      case 'notifications':
        return <DonorNotifications />;
      case 'history':
        return <DonationHistory />; // USE THE NEW COMPONENT
      default:
        return <DonorNotifications />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BloodConnect</span>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                Donor Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <dd className="text-sm text-green-600">{stat.change}</dd>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                      {tab.count && (
                        <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors">
                  Update Availability
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  Download Donor Card
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                  Find Donation Centers
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;