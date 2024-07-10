

const {getAll, getOne, create, remove, update,}=require("../controllers/books.controllers")
const express=require("express");
const { existsBooks, quantityDisponible } = require("../middlewares/books.middlewares");
const verifyJWT = require("../utils/verifyJWT");
const { booksValidator } = require("../middlewares/validator.middlewares");

const booksRouter=express.Router()


booksRouter.route("/")
.get(quantityDisponible,getAll)
.post(booksValidator, create)

booksRouter.route("/:id")
.get(existsBooks,getOne)
.delete(verifyJWT,existsBooks,remove)
.put(verifyJWT,existsBooks,booksValidator,update)

module.exports=booksRouter