

const catchError=require("../utils/catchError");
const {bookshops}=require("../models");

exports.existsBookshops=catchError(async(req, res, next)=>{
const {id}=req.params;
const bookshop=await bookshops.findByPk(id);
        
if(!bookshop){
  return res.status(404).json({message: `There is no library with that id ${id}`});
}

req.Bookshops=bookshop;

next()
}) ;