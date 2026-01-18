const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const getLeadChartData = (leads) => {
  const map = {};

  leads.forEach((lead) => {
    const date = new Date(lead.createdAt);
    const label = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    map[label] = (map[label] || 0) + 1;
  });

  return Object.entries(map).map(([name, leads]) => ({
    name,
    leads,
  }));
};

const getLeadPieData = (leads) => {
  const statusMap = {
    converted: 0,
    "in-progress": 0,
    lost: 0,
    new: 0,
  };

  leads.forEach((lead) => {
    statusMap[lead.status]++;
  });

  return [
    { name: "Converted", value: statusMap.converted },
    { name: "In Progress", value: statusMap["in-progress"] },
    { name: "Lost", value: statusMap.lost },
    { name: "New", value: statusMap.new },
  ];
};

const getNewLeads = (leads) => leads.filter((lead) => lead.status === "new");
const getConvertedLeads = (leads) =>
  leads.filter((lead) => lead.status === "converted");

const getInprogressLeads = (leads) =>
  leads.filter((lead) => lead.status === "in-progress");

export {
  formatDate,
  getLeadChartData,
  getLeadPieData,
  getNewLeads,
  getConvertedLeads,
  getInprogressLeads,
};
