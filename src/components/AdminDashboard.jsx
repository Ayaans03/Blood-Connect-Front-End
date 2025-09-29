import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PendingRequests from './admin/PendingRequests';
import PlatformAnalytics from './admin/PlatformAnalytics';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending-requests');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'pending-requests', name: 'Pending Approvals', icon: ClipboardDocumentListIcon, count: 5 },
    { id: 'analytics', name: 'Platform Analytics', icon: ChartBarIcon },
  ];

  const stats = [
    { label: 'Platform Uptime', value: '99.8%', change: 'This month' },
    { label: 'Active Users', value: '47', change: 'Online now' },
    { label: 'Response Time', value: '120ms', change: 'Average' },
    { label: 'System Health', value: 'Excellent', change: 'All systems normal' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pending-requests':
        return <PendingRequests />;
      case 'analytics':
        return <PlatformAnalytics />;
      default:
        return <PendingRequests />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BloodConnect</span>
              <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                Admin Dashboard
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
                          ? 'bg-purple-100 text-purple-600 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                      {tab.count && (
                        <span className="ml-auto bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                  Manage Users
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  System Settings
                </button>
                <button className="w-full text-left px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors">
                  Generate Reports
                </button>
              </div>
            </div>

            {/* System Alerts */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-medium text-yellow-900">System Alerts</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-700">Pending Verifications</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-700">Support Tickets</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">7</span>
                </div>
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

export default AdminDashboard;