import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DonorProfile from './donor/DonorProfile';
import DonorNotifications from './donor/DonorNotifications';
import DonationHistory from './donor/DonationHistory';
import { 
  getDonorProfile, 
  getDonationHistory,
  getDonorNotifications
} from '../services/donor';
import { 
  HeartIcon, 
  BellIcon, 
  UserIcon, 
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const DonorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');
  const [stats, setStats] = useState({
    totalDonations: 0,
    livesImpacted: 0,
    lastDonation: 'Never donated',
    bloodType: user?.blood_group || 'Unknown',
    eligibleToDonate: true,
    thisYearDonations: 0
  });
  const [pendingNotificationsCount, setPendingNotificationsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchDonorStats();
    fetchNotificationsCount();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: '' });
  };

  const fetchDonorStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [profileResponse, historyResponse] = await Promise.all([
        getDonorProfile(),
        getDonationHistory()
      ]);

      const calculatedStats = calculateDonorStats(
        profileResponse.data, 
        historyResponse.data
      );
      
      setStats(calculatedStats);
    } catch (err) {
      console.error('Error fetching donor stats:', err);
      setError('Failed to load dashboard data. Please try again.');
      setStats({
        totalDonations: 0,
        livesImpacted: 0,
        lastDonation: 'Never donated',
        bloodType: user?.blood_group || 'Unknown',
        eligibleToDonate: true,
        thisYearDonations: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNotificationsCount = async () => {
    try {
      const response = await getDonorNotifications();
      setPendingNotificationsCount(response.data?.count || 0);
    } catch (err) {
      console.error('Error fetching notifications count:', err);
      setPendingNotificationsCount(0);
    }
  };

  const calculateDonorStats = (profileData, historyData) => {
    const totalDonations = historyData?.count || 0;
    const donations = historyData?.donations || [];
    const lastDonation = donations[0];
    
    let lastDonationText = 'Never donated';
    let eligibleToDonate = true;
    let thisYearDonations = 0;
    
    if (lastDonation) {
      const lastDonationDate = new Date(lastDonation.donation_date);
      const today = new Date();
      const daysSinceDonation = Math.floor((today - lastDonationDate) / (1000 * 60 * 60 * 24));
      
      lastDonationText = `${daysSinceDonation} days ago`;
      eligibleToDonate = daysSinceDonation >= 90;
      
      const currentYear = new Date().getFullYear();
      thisYearDonations = donations.filter(donation => {
        const donationYear = new Date(donation.donation_date).getFullYear();
        return donationYear === currentYear;
      }).length;
    }

    const livesImpacted = totalDonations * 3;

    return {
      totalDonations,
      livesImpacted,
      lastDonation: lastDonationText,
      bloodType: profileData?.blood_group || user?.blood_group || 'Unknown',
      eligibleToDonate,
      thisYearDonations
    };
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDownloadDonorCard = async () => {
    try {
      const profileResponse = await getDonorProfile();
      const donorData = profileResponse.data;
      
      const donorCardContent = `
        BLOODCONNECT - DONOR CARD
        =========================
        
        Donor Information:
        -----------------
        Name: ${donorData.full_name || user?.username}
        Blood Type: ${donorData.blood_group || 'Not specified'}
        Donor ID: ${donorData.id || 'N/A'}
        Contact: ${donorData.phone_number || 'Not specified'}
        
        Emergency Contact:
        -----------------
        ${donorData.emergency_contact || 'Not specified'}
        
        Medical Information:
        -------------------
        Allergies: ${donorData.allergies || 'None reported'}
        Chronic Conditions: ${donorData.has_chronic_disease ? donorData.chronic_disease_details : 'None'}
        
        Last Updated: ${new Date().toLocaleDateString()}
        
        Important Notes:
        ---------------
        - Always carry this card with you
        - Present this card at donation centers
        - Keep your contact information updated
        - In case of emergency, show this card to medical personnel
        
        Thank you for being a life-saver! ❤
      `;
      
      const blob = new Blob([donorCardContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BloodConnect_DonorCard_${user?.username || 'donor'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showNotification('Donor card downloaded successfully! You can find it in your downloads folder.', 'success');
    } catch (error) {
      console.error('Error downloading donor card:', error);
      showNotification('Failed to download donor card. Please try again.', 'error');
    }
  };

  const tabs = [
    { id: 'notifications', name: 'Blood Requests', icon: BellIcon, count: pendingNotificationsCount },
    { id: 'profile', name: 'My Profile', icon: UserIcon },
    { id: 'history', name: 'Donation History', icon: ChartBarIcon },
  ];

  const dynamicStats = [
    { label: 'Total Donations', value: stats.totalDonations.toString(), change: `${stats.thisYearDonations} this year`, color: 'text-blue-600' },
    { label: 'Lives Impacted', value: stats.livesImpacted.toString(), change: '3 lives per donation', color: 'text-green-600' },
    { label: 'Last Donation', value: stats.lastDonation, change: stats.eligibleToDonate ? 'Eligible to donate' : 'Not eligible yet', color: stats.eligibleToDonate ? 'text-green-600' : 'text-yellow-600' },
    { label: 'Blood Type', value: stats.bloodType, change: 'Most needed type', color: 'text-red-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <DonorProfile />;
      case 'notifications':
        return <DonorNotifications onResponse={fetchNotificationsCount} />;
      case 'history':
        return <DonationHistory />;
      default:
        return <DonorNotifications onResponse={fetchNotificationsCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BloodConnect</span>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                Donor Dashboard
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
        {/* Success/Error Notification */}
        {notification.show && (
          <div className={`mb-6 rounded-lg p-4 flex items-center justify-between ${
            notification.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
              ) : (
                <XMarkIcon className="h-5 w-5 text-red-600 mr-3" />
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
            <button
              onClick={hideNotification}
              className={`ml-4 ${
                notification.type === 'success' 
                  ? 'text-green-600 hover:text-green-800' 
                  : 'text-red-600 hover:text-red-800'
              }`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center justify-between">
            <div className="flex items-center">
              <XMarkIcon className="h-5 w-5 text-red-600 mr-3" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError('')}
              className="text-red-600 hover:text-red-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
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
                            ? 'bg-red-100 text-red-600 border border-red-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.name}
                        {tab.count > 0 && (
                          <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className="w-full flex items-center text-left px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Update Availability
                  </button>
                  <button 
                    onClick={handleDownloadDonorCard}
                    className="w-full flex items-center text-left px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                    Download Donor Card
                  </button>
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

export default DonorDashboard;
