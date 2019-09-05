const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://DappProgrammer:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-ayumf.mongodb.net/test?retryWrites=true&w=majority",
  {
    useMongoClient: true
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Origin-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIOS") {
    res.header("Access-Control-Allow-Method", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not fount");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
