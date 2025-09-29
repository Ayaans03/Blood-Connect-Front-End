import React, { useState, useEffect } from 'react';
import { getHospitalProfile } from '../../services/staff';
import { BuildingLibraryIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const HospitalProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getHospitalProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching hospital profile:', error);
    } finally {
      setLoading(false);
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
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <BuildingLibraryIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
          <p className="text-gray-600">Hospital Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">License Number</label>
            <p className="mt-1 text-lg text-gray-900">{profile?.license_number}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <div className="flex items-center mt-1">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-lg text-gray-900">{profile?.email}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <div className="flex items-center mt-1">
              <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-lg text-gray-900">{profile?.phone_number}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className={`mt-1 text-lg font-semibold ${
              profile?.is_active ? 'text-green-600' : 'text-red-600'
            }`}>
              {profile?.is_active ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Staff Designation</label>
            <p className="mt-1 text-lg text-gray-900">{profile?.staff_designation}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Primary Contact</label>
            <p className="mt-1 text-lg text-gray-900">
              {profile?.is_primary_contact ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-start">
          <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
          <div>
            <label className="text-sm font-medium text-gray-500">Address</label>
            <p className="mt-1 text-gray-900">{profile?.address}</p>
            <p className="text-gray-600">
              {profile?.city}, {profile?.state}, {profile?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;