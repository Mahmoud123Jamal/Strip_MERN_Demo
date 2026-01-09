import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import cron from "node-cron";
import { cleanupExpiredLocks } from "./jobs/cleanupExpiredLocks";

const PORT = process.env.PORT || 5000;

connectDB();

// Run cleanup job every 1 minute
cron.schedule("* * * * *", cleanupExpiredLocks);
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
