import React, { useState } from 'react';
import { createBloodRequest } from '../../services/staff';
import { useAuth } from '../../context/AuthContext';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_age: '',
    patient_gender: '',
    blood_group: '',
    units_required: 1,
    hemoglobin_level: '',
    diagnosis: '',
    operation_id: '',
    urgency_level: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await createBloodRequest(formData);
      if (result.status === 201) {
        setMessage('Blood request submitted successfully! It will be reviewed by the blood bank.');
        setFormData({
          patient_name: '',
          patient_age: '',
          patient_gender: '',
          blood_group: '',
          units_required: 1,
          hemoglobin_level: '',
          diagnosis: '',
          operation_id: '',
          urgency_level: 'medium'
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to create blood request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Blood Request</h2>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Name *
            </label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Age *
            </label>
            <input
              type="number"
              name="patient_age"
              value={formData.patient_age}
              onChange={handleChange}
              min="1"
              max="120"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Gender *
            </label>
            <select
              name="patient_gender"
              value={formData.patient_gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group *
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Units Required *
            </label>
            <input
              type="number"
              name="units_required"
              value={formData.units_required}
              onChange={handleChange}
              min="1"
              max="10"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hemoglobin Level (g/dL) *
            </label>
            <input
              type="number"
              name="hemoglobin_level"
              value={formData.hemoglobin_level}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Urgency Level *
          </label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {urgencyLevels.map(level => (
              <label key={level.value} className="relative flex cursor-pointer">
                <input
                  type="radio"
                  name="urgency_level"
                  value={level.value}
                  checked={formData.urgency_level === level.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-full text-center py-3 px-4 border rounded-lg transition-colors ${
                  formData.urgency_level === level.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}>
                  <span className={`font-medium ${level.color}`}>
                    {level.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Operation ID (Optional)
          </label>
          <input
            type="text"
            name="operation_id"
            value={formData.operation_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Diagnosis / Medical Condition *
          </label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the patient's medical condition and reason for blood requirement..."
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Submitting...' : 'Submit Blood Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;