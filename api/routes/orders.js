const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling get requests to /orders"
  });
});

router.post("/", (req, res, next) => {
  const order = {
    orderId: req.body.orderId,
    qty: req.body.qty
  };
  res.status(200).json({
    message: "Handling post requests to /orders",
    order: order
  });
});

module.exports = router;
