// Importing required modules
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Configuring dotenv to load environment variables from .env file
dotenv.config();
const config = require("config");

// Importing local modules
const routes = require("./src/routes");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const strategy = require("./src/config/passport");

// Creating an Express application
const app = express();

// Configuring Passport
passport.use(strategy);
passport.initialize();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("tiny"));

// Handling uncaught exceptions and unhandled rejections
process.on("uncaughtException", (ex) => {
  console.log("Uncaught exception, server closed.");
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("Unhandled rejection, server closed.");
  process.exit(1);
});

// Connecting to MongoDB
mongoose
  .connect(config.get("mongoUrl"))
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("Error connecting to MongoDB"));

// Routes
app.use("/v1", routes);

// Error handling middleware
app.use(errorConverter);
app.use(errorHandler);

// Starting the server
const port = process.env.PORT || config.get("port") || 3000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
