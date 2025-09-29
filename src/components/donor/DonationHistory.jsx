import React, { useState, useEffect } from 'react';
import { getDonationHistory } from '../../services/donor';
import { CalendarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const response = await getDonationHistory();
      console.log('Donation history response:', response.data);
      setDonations(response.data.donations || []);
    } catch (error) {
      console.error('Error fetching donation history:', error);
      setError('Failed to load donation history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
          {donations.length} Donations
        </span>
      </div>

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <HeartIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Donations Yet</h3>
          <p className="text-gray-500 mb-6">
            Your donation history will appear here once you start accepting blood requests and saving lives.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-blue-900 mb-2">Ready to make your first donation?</h4>
            <p className="text-blue-700 text-sm">
              Keep your availability status updated and respond to blood requests when they match your blood type.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <div key={donation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Donation for {donation.patient_name}
                  </h3>
                  <p className="text-gray-600">{donation.hospital_name}</p>
                </div>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  Completed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>
                    {new Date(donation.donation_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{donation.hospital_name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  <span>{donation.units_donated || 1} unit(s) donated</span>
                </div>
              </div>

              {donation.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">{donation.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Statistics Section */}
      {donations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{donations.length}</div>
            <div className="text-sm text-red-700">Total Donations</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {donations.reduce((total, donation) => total + (donation.units_donated || 1), 0)}
            </div>
            <div className="text-sm text-green-700">Total Units</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {donations.length * 3}
            </div>
            <div className="text-sm text-blue-700">Lives Impacted</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;