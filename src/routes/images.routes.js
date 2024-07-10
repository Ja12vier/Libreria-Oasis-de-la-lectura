

const {getAll, create, remove}=require("../controllers/images.controllers");
const express=require("express");
const upload = require("../utils/multer");

const imagesRouter=express.Router()


imagesRouter.route("/")
.get(getAll)
.post(upload.single("image"),create)

imagesRouter.route("/:id")
.delete(remove)


module.exports=imagesRouter