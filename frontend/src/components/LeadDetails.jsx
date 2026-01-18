import React from "react";
import { X, Mail, Phone, Building, Globe, Activity } from "lucide-react";

const LeadDetails = ({ isOpen, onClose, user }) => {
  


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
   
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Profile Header */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.company}</p>
            </div>
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              icon={<Mail size={18} />}
              label="Email Address"
              value={user.email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Phone Number"
              value={user.phone}
            />

            <InfoItem
              icon={<Building size={18} />}
              label="Company"
              value={user.company}
            />

            <InfoItem
              icon={<Globe size={18} />}
              label="Source"
              value={user.source}
            />

            {/* Status Full Width */}
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-gray-400">
                  <Activity size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Current Status
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
    <div className="mt-0.5 text-gray-400">{icon}</div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900 wrap-break-word">
        {value}
      </p>
    </div>
  </div>
);

export default LeadDetails;
