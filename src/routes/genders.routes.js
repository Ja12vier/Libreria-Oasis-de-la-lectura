
const {getAll, getOne, create, remove, update,}=require("../controllers/genders.controllers")
const express=require("express");
const { existsGenders } = require("../middlewares/genders.middlewares");
const verifyJWT = require("../utils/verifyJWT");
const gendersRouter=express.Router()


gendersRouter.route("/")
.get(getAll)
.post(create)

gendersRouter.route("/:id")
.get(existsGenders,getOne)
.delete(verifyJWT,existsGenders,remove)
.put(verifyJWT,existsGenders,update)

module.exports=gendersRouter