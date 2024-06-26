const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cars = require("./routes/cars");
const auth = require("./routes/auth");
const bookings = require("./routes/bookings");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config/config.env" });

connectDB();
const cors = require("cors");
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  credentials: true // Allow credentials to be sent with requests
}));
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
app.use(hpp());
app.use(cookieParser());
app.use("/api/v1/cars", cars);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);

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