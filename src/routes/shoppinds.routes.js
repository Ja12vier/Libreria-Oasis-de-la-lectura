
const {createShoppinds, removeShoopinds, getShoppinds}=require("../controllers/shoppinds.controllers");
const express=require("express");
const verifyJWT = require("../utils/verifyJWT");


const shoppindsRouter=express.Router();

shoppindsRouter.route("/")
.get(verifyJWT, getShoppinds)

shoppindsRouter.route("/all")
.get(verifyJWT,createShoppinds)

shoppindsRouter.route("/:id")
.delete(verifyJWT, removeShoopinds)

module.exports=shoppindsRouter;