const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const leadRoutes = require("./routes/lead");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
const port = process.env.PORT || 4000;

// Routes
app.get("/", async (req, res) => {
  res.send("Backend is running...");
});
app.use("/api/leads", leadRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
