import React, { useState, useEffect } from 'react';
import { getPlatformStats, getRecentActivity } from '../../services/admin';
import { 
  UserGroupIcon, 
  BuildingLibraryIcon, 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const PlatformAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        getPlatformStats(),
        getRecentActivity()
      ]);
      setStats(statsResponse.data);
      setActivities(activityResponse.data.activities || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration': return <UserGroupIcon className="h-5 w-5 text-green-500" />;
      case 'request': return <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />;
      case 'approval': return <CheckCircleIcon className="h-5 w-5 text-purple-500" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total_donors}</div>
              <div className="text-sm text-gray-500">Total Donors</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <BuildingLibraryIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total_hospitals}</div>
              <div className="text-sm text-gray-500">Partner Hospitals</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <ClipboardDocumentListIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total_requests}</div>
              <div className="text-sm text-gray-500">Total Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircleIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.fulfilled_requests}</div>
              <div className="text-sm text-gray-500">Fulfilled Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.pending_approvals}</div>
              <div className="text-sm text-gray-500">Pending Approvals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">System Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">API Service</span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email Service</span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Active</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm text-gray-900">~120ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm text-gray-900">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="text-sm text-gray-900">47</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;