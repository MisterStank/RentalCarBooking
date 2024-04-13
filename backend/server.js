const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// const nodemailer = require("nodemailer");
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const PORT = process.env.PORT || 5001;
const server = app.listen(
  PORT,
  console.log(
    "Server running in",
    process.env.NODE_ENV,
    "on http://localhost:" + PORT
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
