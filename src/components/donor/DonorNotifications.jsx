import React, { useState, useEffect } from 'react';
import { getDonorNotifications, respondToNotification } from '../../services/donor';
import { ClockIcon, MapPinIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getDonorNotifications();
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (notificationId, response) => {
    setResponding(notificationId);
    try {
      await respondToNotification(notificationId, response);
      // Remove the notification from the list
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error('Error responding to notification:', error);
    } finally {
      setResponding(null);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blood Requests</h2>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
          {notifications.length} Pending
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No pending requests</h3>
          <p className="mt-2 text-gray-500">You'll be notified when your blood type is needed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Blood Request for {notification.request_details?.patient_name}
                  </h3>
                  <p className="text-gray-600">
                    {notification.request_details?.hospital_name} • {notification.request_details?.hospital_city}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(notification.request_details?.urgency_level)}`}>
                  {notification.request_details?.urgency_level?.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>Required: {notification.request_details?.units_required} units</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{notification.request_details?.hospital_city}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Medical Details:</h4>
                <p className="text-gray-600 text-sm">{notification.request_details?.diagnosis}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleResponse(notification.id, 'accept')}
                  disabled={responding === notification.id}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                >
                  {responding === notification.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Accept Request
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleResponse(notification.id, 'decline')}
                  disabled={responding === notification.id}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorNotifications;