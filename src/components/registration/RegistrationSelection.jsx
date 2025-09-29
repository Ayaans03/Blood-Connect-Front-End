import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, BuildingLibraryIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const RegistrationSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join BloodConnect</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to contribute to our life-saving community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Donor Registration Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <HeartIcon className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Donor</h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join thousands of heroes who save lives through blood donation. 
                Register as a donor and get notified when your blood type is needed.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Get notified when your blood type is needed
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track your donation history and impact
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Help save up to 3 lives with each donation
                </li>
              </ul>
              
              <Link
                to="/register/donor"
                className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                Register as Donor
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Hospital Registration Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <BuildingLibraryIcon className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hospital Registration</h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with verified blood donors in your area. 
                Submit blood requests and find donors quickly when patients need help.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit blood requests to verified donors
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access donor database with filtering
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Streamlined donor communication
                </li>
              </ul>
              
              <Link
                to="/register/hospital"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Register Hospital
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSelection;