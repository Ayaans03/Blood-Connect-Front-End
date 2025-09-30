import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HospitalProfile from './staff/HospitalProfile';
import CreateRequest from './staff/CreateRequest';
import RequestList from './staff/RequestList';
import { 
  getHospitalStats,
  getRequestStats 
} from '../services/staff';
import { 
  BuildingLibraryIcon, 
  PlusCircleIcon, 
  ListBulletIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create-request');
  const [stats, setStats] = useState({
    total_requests: 0,
    pending_requests: 0,
    approved_requests: 0,
    completed_requests: 0,
    available_donors: 0,
    success_rate: 0,
    this_month_requests: 0
  });
  const [requestStats, setRequestStats] = useState({
    pending: 0,
    approved: 0,
    completed: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHospitalStats();
  }, []);

  const fetchHospitalStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try to fetch stats, but handle cases where endpoints might not exist
      const [statsResponse, requestStatsResponse] = await Promise.all([
        getHospitalStats().catch(err => {
          console.warn('Hospital stats endpoint not available:', err);
          return { data: getFallbackStats() };
        }),
        getRequestStats().catch(err => {
          console.warn('Request stats endpoint not available:', err);
          return { data: getFallbackRequestStats() };
        })
      ]);

      setStats(statsResponse.data);
      setRequestStats(requestStatsResponse.data);
    } catch (err) {
      console.error('Error fetching hospital stats:', err);
      setError('Some dashboard features may not be available. Basic functionality is working.');
      // Set fallback stats
      setStats(getFallbackStats());
      setRequestStats(getFallbackRequestStats());
    } finally {
      setLoading(false);
    }
  };

  // Fallback stats if endpoints don't exist
  const getFallbackStats = () => ({
    total_requests: 0,
    pending_requests: 0,
    approved_requests: 0,
    completed_requests: 0,
    available_donors: 0,
    success_rate: 0,
    this_month_requests: 0
  });

  const getFallbackRequestStats = () => ({
    pending: 0,
    approved: 0,
    completed: 0,
    rejected: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'create-request', name: 'Create Request', icon: PlusCircleIcon },
    { id: 'requests', name: 'View Requests', icon: ListBulletIcon },
    { id: 'profile', name: 'Hospital Profile', icon: BuildingLibraryIcon },
  ];

  // Dynamic stats with real data
  const dynamicStats = [
    { 
      label: 'Total Requests', 
      value: stats.total_requests.toString(), 
      change: `+${stats.this_month_requests} this month`,
      color: 'text-blue-600'
    },
    { 
      label: 'Pending Approval', 
      value: stats.pending_requests.toString(), 
      change: 'Waiting for review',
      color: 'text-yellow-600'
    },
    { 
      label: 'Available Donors', 
      value: stats.available_donors.toString(), 
      change: 'Ready to donate',
      color: 'text-green-600'
    },
    { 
      label: 'Success Rate', 
      value: `${stats.success_rate}%`, 
      change: 'Requests fulfilled',
      color: stats.success_rate >= 80 ? 'text-green-600' : stats.success_rate >= 50 ? 'text-yellow-600' : 'text-red-600'
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <HospitalProfile />;
      case 'create-request':
        return <CreateRequest onRequestCreated={fetchHospitalStats} />;
      case 'requests':
        return <RequestList />;
      default:
        return <CreateRequest onRequestCreated={fetchHospitalStats} />;
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
        {/* Warning Message for missing stats */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dynamicStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <dd className={`text-sm ${stat.color}`}>{stat.change}</dd>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Request Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600">Pending</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                      {requestStats.pending}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Approved</span>
                    </div>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                      {requestStats.approved}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BuildingLibraryIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                      {requestStats.completed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600">Rejected</span>
                    </div>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {requestStats.rejected}
                    </span>
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
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;