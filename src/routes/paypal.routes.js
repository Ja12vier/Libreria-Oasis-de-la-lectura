const {createOrder, captureOrder, cancelPayment}=require("../controllers/paypal.controllers")
const express=require("express");
const verifyJWT = require("../utils/verifyJWT");
const paypalRouter=express.Router();

paypalRouter.route("/create-order")
.post(verifyJWT,createOrder)

paypalRouter.route("/capture-order")
.get(captureOrder)

paypalRouter.route("/cancel-order")
.get(cancelPayment)


module.exports=paypalRouter