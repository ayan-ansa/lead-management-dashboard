import React from "react";

const StatCard = ({ title, value, change, isPositive, color, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {change && (
          <p
            className={`text-xs mt-2 font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}{" "}
            <span className="text-gray-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color} text-white`}>{icon}</div>
    </div>
  );
};

export default StatCard;
