const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.odxd9.gcp.mongodb.net/RestMax?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/order");
const userRoutes = require("./api/routes/user");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Requested-With,Origin,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    req.headers("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/upload", express.static("upload/"));
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
