

const { create, getAll}=require("../controllers/books_bookshops.controllers")
const express=require("express")


const books_bookshopRouter=express.Router()


books_bookshopRouter.route("/")
.get(getAll)
.post(create)



module.exports=books_bookshopRouter