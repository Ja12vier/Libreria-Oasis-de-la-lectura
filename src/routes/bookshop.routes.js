
const {getAll, getOne, create, remove, update, setBooksBookshops}=require("../controllers/bookshops.controllers")
const express=require("express");
const { existsBookshops } = require("../middlewares/bookshops.middlewares");
const { bookshopsValidation } = require("../middlewares/validator.middlewares");
const bookshopsRouter=express.Router()


bookshopsRouter.route("/")
.get(getAll)
.post(bookshopsValidation,create)



bookshopsRouter.route("/:id")
.get(existsBookshops,getOne)
.delete(existsBookshops,remove)
.put(bookshopsValidation,existsBookshops,update)

bookshopsRouter.route("/:id/book_bookshop")
.get(setBooksBookshops)
.post(existsBookshops,setBooksBookshops)

module.exports=bookshopsRouter