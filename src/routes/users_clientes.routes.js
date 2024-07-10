
const {getAll, getOne, create, remove, update, updatePassword, login}=require("../controllers/users_clientes.controllers");
const express=require("express");
const { existsUser_cliente } = require("../middlewares/user_clente.meddlewares");
const { users_clientesValidation } = require("../middlewares/validator.middlewares");
const verifyJWT = require("../utils/verifyJWT");

const usersRoutes=express.Router();

usersRoutes.route("/")
.get(getAll)
.post(users_clientesValidation,create)


usersRoutes.route("/login")
.post(login)

usersRoutes.route("/login/updatepassword")
.put(updatePassword)


usersRoutes.route("/:id")
.get(verifyJWT,existsUser_cliente,getOne)
.delete(verifyJWT,existsUser_cliente,remove)
.put(verifyJWT,existsUser_cliente,update)




module.exports=usersRoutes
