import { Trash2 } from "lucide-react";
import React from "react";
import { formatDate } from "../utils/formatter";

const LeadTable = ({ leads, handleLeadClick, onDelete, onClear }) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
        <tr>
          <th className="px-6 py-3 font-medium">Name</th>
          <th className="px-6 py-3 font-medium">Source</th>
          <th className="px-6 py-3 font-medium">Company</th>
          <th className="px-6 py-3 font-medium">Created At</th>
          <th className="px-6 py-3 font-medium">Status</th>

          <th className="px-6 py-3 font-medium text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {leads.length > 0 ? (
          leads.map((lead) => (
            <tr
              key={lead._id}
              onClick={() => handleLeadClick(lead._id)}
              className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase bg-purple-100 text-purple-700`}
                  >
                    {lead.name.charAt(0)}
                  </div>
                  {lead.name}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">{lead.source}</td>
              <td className="px-6 py-4 text-gray-500">{lead.company}</td>
              <td className="px-6 py-4 text-gray-500">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                    lead.status === "new"
                      ? "bg-blue-100 text-[#2563eb]"
                      : lead.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.status === "lost"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-[#16a34a]"
                  }`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="px-6 py-4 text-right z-50">
                <button
                  className="text-red-600 hover:bg-red-50 rounded p-1 transition-colors cursor-pointer"
                  title="Delete Lead"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(lead._id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-12 text-center">
              <h3 className="text-xl font-semibold text-gray-500">
                No leads found
              </h3>
              <button
                onClick={onClear}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Reset all filters
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LeadTable;
