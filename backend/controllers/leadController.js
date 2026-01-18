const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page);

    let query = Lead.find();

    if (page) {
      query = query.skip((page - 1) * 10).limit(10);
    }

    const leads = await query;

    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).select("-__v");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
};

const searchLeads = async (req, res) => {
  const searchRegex = new RegExp(req.params.name, "i");

  try {
    const leads = await Lead.find({
      $or: [{ name: searchRegex }, { company: searchRegex }],
    });
    if (!leads) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
};

const filterLeadsByCompany = async (req, res) => {
  try {
    const leads = await Lead.find({ company: req.params.name });
    if (!leads) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
};

const sortByName = async (req, res) => {
  const { orderBy } = req.params;
  try {
    let leads;
    if (orderBy === "a-z") {
      leads = await Lead.find().sort({ name: 1 });
      if (!leads) {
        return res.status(404).json({ message: "Lead not found" });
      }
    } else if (orderBy === "z-a") {
      leads = await Lead.find().sort({ name: -1 });
      if (!leads) {
        return res.status(404).json({ message: "Lead not found" });
      }
    }
    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  searchLeads,
  filterLeadsByCompany,
  sortByName,
  deleteLead,
};
