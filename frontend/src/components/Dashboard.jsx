import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import {
  Activity,
  Filter,
  Search,
  X,
  UserPlus,
  Target,
  Users,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import LeadTable from "./LeadTable";
import Pagination from "./Pagination";
import LeadDetails from "./LeadDetails";
import {
  getConvertedLeads,
  getInprogressLeads,
  getLeadChartData,
  getLeadPieData,
  getNewLeads,
} from "../utils/formatter";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const colors = ["#16a34a", "#f59e0b", "#dc2626", "#2563eb"];
const leadsPerPage = 10;

export const Dashboard = ({ user, getUser }) => {
  const [searchItem, setSearchItem] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allLeads, setAllLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [chartData, setChartData] = useState([]);

  const handlePageChange = async (pageNo) => {
    setCurrentPage(pageNo);
    try {
      const response = await fetch(`${BASE_URL}/api/leads/?page=${pageNo}`);
      const resData = await response.json();
      if (resData.success) {
        setLeads(resData.data);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const getCurrentLeads = (data) => {
    const totalPages = Math.ceil(data.length / leadsPerPage);

    const startIndex = (currentPage - 1) * leadsPerPage;
    const currentLeads = data.slice(startIndex, startIndex + leadsPerPage);
    setTotalPage(totalPages);

    setChartData(currentLeads);
    setLeads(currentLeads);
  };
  const handleLeadClick = async (leadId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/leads/${leadId}`);
      const resData = await response.json();

      if (resData.success) {
        setSelectedLead(resData.data);
        setIsModalOpen(true);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  const getLeads = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/leads`);
      const resData = await response.json();

      if (resData.success) {
        setAllLeads(resData.data);
        getCurrentLeads(resData.data);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchItem.length < 3) {
      alert("Please enter at least 3 characters");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/api/leads/search/${searchItem}`,
      );
      const resData = await response.json();
      if (resData.success) {
        getCurrentLeads(resData.data);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error searching leads:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/leads/${id}`, {
        method: "DELETE",
      });
      const resData = await response.json();
      if (resData.success) {
        getLeads();
      } else {
        alert(resData.message);
      }
    } catch (error) {
      console.error("Error deleting leads:", error);
    }
  };

  const handleFilterByCompany = async (company) => {
    setCompanyFilter(company);
    if (company === "all") {
      getLeads();
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/api/leads/company/${company}`,
        );
        const resData = await response.json();
        if (resData.success) {
          getCurrentLeads(resData.data);
        } else {
          console.log(resData.message);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    }
  };

  const handleSortByName = async (orderBy) => {
    setSortBy(orderBy);
    try {
      const response = await fetch(`${BASE_URL}/api/leads/sort/${orderBy}`);
      const resData = await response.json();
      if (resData.success) {
        getCurrentLeads(resData.data);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    getUser();
  };

  const handleClear = () => {
    setSearchItem("");
    setCurrentPage(1);
    setCompanyFilter("");
    setSortBy("");
    getLeads();
  };

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <div className="dashboard-layout flex h-screen bg-gray-900 text-white">
      <main className="main-content flex-1 p-8 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold inline-block px-4 py-2">
                👋 My Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {user && `Welcome back, ${user.name}!`}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <StatCard
              title={"Total Leads"}
              value={allLeads.length}
              change="12%"
              isPositive={true}
              icon={<Users className="w-5 h-5" />}
              color="bg-indigo-500"
            />
            <StatCard
              title={"New Leads"}
              value={getNewLeads(allLeads).length}
              change="8%"
              isPositive={true}
              icon={<UserPlus className="w-5 h-5" />}
              color="bg-blue-500"
            />
            <StatCard
              title={"In Progress"}
              value={getInprogressLeads(allLeads).length}
              change="23%"
              isPositive={true}
              icon={<Activity className="w-5 h-5" />}
              color="bg-yellow-500"
            />
            <StatCard
              title={"Converted"}
              value={getConvertedLeads(allLeads).length}
              change="23%"
              isPositive={true}
              icon={<Target className="w-5 h-5" />}
              color="bg-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-6 col-span-1 lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Leads by Month
                </h3>

                <div className="h-64 w-full border-amber-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getLeadChartData(allLeads)}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f3f4f6"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="leads"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={getLeadPieData(allLeads)}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {getLeadPieData(allLeads).map((_, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col gap-4 mb-8 bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-4 items-center w-full">
                <div className="relative grow min-w-62.5">
                  <form onSubmit={handleSubmit}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or company..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      value={searchItem}
                      onChange={(e) => setSearchItem(e.target.value)}
                    />
                    <X
                      onClick={handleClear}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                  </form>
                </div>

                <div className="flex gap-2 items-center">
                  <label className="text-sm text-gray-600 font-medium">
                    Company
                  </label>
                  <select
                    className="border px-2 py-1 rounded-md bg-white text-gray-900"
                    value={companyFilter}
                    onChange={(e) => handleFilterByCompany(e.target.value)}
                  >
                    <option value="all">All Companies</option>
                    {[...new Set(allLeads.map((l) => l.company))].map(
                      (c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-sm text-gray-600 font-medium">
                    Sort by
                  </label>
                  <select
                    className="border px-2 py-1 rounded-md bg-white text-gray-900"
                    onChange={(e) => handleSortByName(e.target.value)}
                    value={sortBy}
                  >
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                </div>

                <div className="flex gap-2 ml-auto">
                  <button
                    className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
                    disabled
                  >
                    <Filter className="w-4 h-4" />
                    Results {leads.length}
                  </button>

                  <button
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    onClick={handleClear}
                    disabled={
                      !searchItem &&
                      !companyFilter &&
                      !sortBy &&
                      currentPage === 1
                    }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Leads Activity</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All Leads
              </button>
            </div>
            <div className="overflow-x-auto">
              <LeadTable
                leads={leads}
                handleLeadClick={handleLeadClick}
                onDelete={handleDelete}
                onClear={handleClear}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <LeadDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedLead}
        />
      )}
    </div>
  );
};
