import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HospitalProfile from './staff/HospitalProfile';
import CreateRequest from './staff/CreateRequest';
import RequestList from './staff/RequestList';
import { 
  BuildingLibraryIcon, 
  PlusCircleIcon, 
  ListBulletIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create-request');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'create-request', name: 'Create Request', icon: PlusCircleIcon },
    { id: 'requests', name: 'View Requests', icon: ListBulletIcon },
    { id: 'profile', name: 'Hospital Profile', icon: BuildingLibraryIcon },
  ];

  const stats = [
    { label: 'Total Requests', value: '15', change: '+5 this month' },
    { label: 'Pending Approval', value: '3', change: 'Waiting for review' },
    { label: 'Active Donors', value: '127', change: 'In your area' },
    { label: 'Success Rate', value: '92%', change: 'Requests fulfilled' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <HospitalProfile />;
      case 'create-request':
        return <CreateRequest />;
      case 'requests':
        return <RequestList />;
      default:
        return <CreateRequest />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BuildingLibraryIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BloodConnect</span>
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Hospital Staff
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
                          ? 'bg-blue-100 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Approved</span>
                  </div>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">4</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">Emergency Support</h3>
              <p className="text-red-700 text-sm mb-3">
                For urgent blood requirements, contact our 24/7 emergency line.
              </p>
              <div className="bg-white rounded p-3">
                <p className="text-red-600 font-semibold text-center">+1 (555) 123-HELP</p>
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

export default StaffDashboard;