const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./src/routes");
const error = require("./src/middleware/error");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/v1", routes);
app.use(error);

mongoose
  .connect(config.get("mongoUrl"))
  .then(() => console.log("Connected to mongodb."))
  .catch(() => {
    console.log("Error connecting mongodb database.");
  });

app.listen(config.get("port") || 3000, () => {
  console.log(`Listening at port ${process.env.PORT || config.get("port")}`);
});
