const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { strategy } = require("./src/middleware/passport");
const routes = require("./src/routes");
const error = require("./src/middleware/error");
const MongoStore = require("connect-mongo");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

passport.use(strategy);

app.use(
  session({
    secret: config.get("session"),
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.get("mongoUrl") }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
