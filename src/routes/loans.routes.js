const {getAll, create, updateLoanStatus, remove}=require("../controllers/loans.controllers");
const express=require("express");
const {loansCreate, updateAdministratorLoans, removeLoans}=require("../middlewares/loans.middlewares");
const verifyJWT = require("../utils/verifyJWT");
const { loansValidator } = require("../middlewares/validator.middlewares");
const loansRouter=express.Router();

loansRouter.route("/")
.get(verifyJWT,getAll)
.post(verifyJWT,loansValidator,loansCreate,create)

loansRouter.route("/:id")
.delete(verifyJWT, removeLoans, remove)
.patch(verifyJWT,updateAdministratorLoans,updateLoanStatus)


module.exports=loansRouter