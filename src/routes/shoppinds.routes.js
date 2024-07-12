
const {createShoppinds, removeShoopinds, getShoppinds, getALLShoppinds}=require("../controllers/shoppinds.controllers");
const express=require("express");
const verifyJWT = require("../utils/verifyJWT");


const shoppindsRouter=express.Router();

shoppindsRouter.route("/")
.get(verifyJWT, getShoppinds)

shoppindsRouter.route("/buy-all")
.get(verifyJWT,createShoppinds)

shoppindsRouter.route("/all")
.get(getALLShoppinds)

shoppindsRouter.route("/:id")
.delete(verifyJWT, removeShoopinds)

module.exports=shoppindsRouter;