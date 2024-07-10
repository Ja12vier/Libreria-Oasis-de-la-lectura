


const {getAll, getOne, create, remove, update,}=require("../controllers/carts.controllers")
const express=require("express");
const { existsCarst, createCarts, updateCarts  } = require("../middlewares/carts.middlewares");
const verifyJWT = require("../utils/verifyJWT");


const cartsRouter=express.Router()


cartsRouter.route("/")
.get(verifyJWT,getAll)
.post(verifyJWT,createCarts, create)

cartsRouter.route("/:id")
.get(verifyJWT,existsCarst,getOne)
.delete(verifyJWT,existsCarst,remove)
.patch(verifyJWT,updateCarts,update)

module.exports=cartsRouter