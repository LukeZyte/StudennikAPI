const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");

const app = express();

const port = 3000;
const hostname = "127.0.0.1";

////////////
// Routes //
const authRoutes = require("./routes/auth");

////////////
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    // console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });
