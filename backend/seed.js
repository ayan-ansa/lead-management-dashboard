const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Lead = require("./models/Lead");
const leads = require("./data");

dotenv.config();

connectDB();

async function seed() {
  try {
    await Lead.insertMany(leads);
    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
