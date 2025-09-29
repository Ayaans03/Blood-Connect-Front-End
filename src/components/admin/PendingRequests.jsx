import React, { useState, useEffect } from 'react';
import { getPendingRequests, approveRequest, rejectRequest } from '../../services/admin';
import { CheckCircleIcon, XCircleIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await getPendingRequests();
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    setProcessing(requestId);
    try {
      await approveRequest(requestId);
      // Remove the approved request from the list
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId) => {
    setProcessing(requestId);
    try {
      await rejectRequest(requestId);
      // Remove the rejected request from the list
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setProcessing(null);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
          {requests.length} Pending
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">All caught up!</h3>
          <p className="mt-2 text-gray-500">No pending requests requiring approval.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.patient_name} ({request.patient_age} years)
                  </h3>
                  <p className="text-gray-600">
                    {request.hospital_name} • {request.hospital_city}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency_level)}`}>
                    {request.urgency_level.toUpperCase()}
                  </span>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Pending
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Blood Group:</span>
                    <span className="font-bold text-red-600">{request.blood_group}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Units Required:</span>
                    <span>{request.units_required}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Hemoglobin:</span>
                    <span>{request.hemoglobin_level} g/dL</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span>{request.hospital_city}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium mr-2">Operation ID:</span>
                    <span>{request.operation_id || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Medical Condition:</h4>
                <p className="text-gray-600 text-sm">{request.diagnosis}</p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Submitted: {new Date(request.created_at).toLocaleDateString()}</span>
                <span>Request ID: #{request.id}</span>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleApprove(request.id)}
                  disabled={processing === request.id}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                >
                  {processing === request.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  disabled={processing === request.id}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;