const express = require("express");
const {
  getLeads,
  getLeadById,
  searchLeads,
  deleteLead,
  filterLeadsByCompany,
  sortByName,
} = require("../controllers/leadController");

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.delete("/:id", deleteLead);
router.get("/search/:name", searchLeads);
router.get("/company/:name", filterLeadsByCompany);
router.get("/sort/:orderBy", sortByName);

module.exports = router;
