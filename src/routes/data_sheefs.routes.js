






const {getAll, getOne, create, remove, update,}=require("../controllers/data_sheefs.controllers")
const express=require("express");
const { existsDataSheefs } = require("../middlewares/data_sheefs.middlewares");


const dataSheefsRouter=express.Router()


dataSheefsRouter.route("/")
.get(getAll)
.post(create)

dataSheefsRouter.route("/:id")
.get(existsDataSheefs,getOne)
.delete(existsDataSheefs,remove)
.put(existsDataSheefs,update)

module.exports=dataSheefsRouter