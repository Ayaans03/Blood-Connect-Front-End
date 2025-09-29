import React, { useState, useEffect } from 'react';
import { getHospitalRequests } from '../../services/staff';
import { ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getHospitalRequests();
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-5 w-5" />;
      case 'rejected': return <XCircleIcon className="h-5 w-5" />;
      case 'completed': return <CheckCircleIcon className="h-5 w-5" />;
      case 'pending': return <ClockIcon className="h-5 w-5" />;
      default: return <ExclamationTriangleIcon className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blood Requests</h2>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {requests.length} Total
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No blood requests yet</h3>
          <p className="mt-2 text-gray-500">Create your first blood request to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.patient_name} ({request.patient_age} years)
                  </h3>
                  <p className="text-gray-600">
                    Blood Group: <span className="font-semibold">{request.blood_group}</span> • 
                    Units: <span className="font-semibold">{request.units_required}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Diagnosis:</span> {request.diagnosis}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Hemoglobin:</span> {request.hemoglobin_level} g/dL
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Urgency:</span> 
                  <span className={`ml-1 capitalize ${
                    request.urgency_level === 'critical' ? 'text-red-600' :
                    request.urgency_level === 'high' ? 'text-orange-600' :
                    request.urgency_level === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {request.urgency_level}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Created: {new Date(request.created_at).toLocaleDateString()}</span>
                {request.operation_id && (
                  <span>Operation ID: {request.operation_id}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;