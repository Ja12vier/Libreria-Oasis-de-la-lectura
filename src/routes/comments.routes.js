
const {getAll, create, remove}=require("../controllers/comments.controllers");
const express=require("express");

const commentsRouter=express.Router();

commentsRouter.route("/")
.get(getAll)
.post(create)

commentsRouter.route("/:id")
.get(remove)

module.exports=commentsRouter