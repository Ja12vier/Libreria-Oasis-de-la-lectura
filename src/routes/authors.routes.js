

const {getAll, getOne, create, remove, update,}=require("../controllers/authors.controllers")
const express=require("express");
const { existsauthors } = require("../middlewares/authors.middlewares");
const verifyJWT = require("../utils/verifyJWT");


const authorsRouter=express.Router()


authorsRouter.route("/")
.get(getAll)
.post(create)

authorsRouter.route("/:id")
.get(existsauthors,getOne)
.delete(existsauthors,remove)
.put(existsauthors,update)

module.exports=authorsRouter