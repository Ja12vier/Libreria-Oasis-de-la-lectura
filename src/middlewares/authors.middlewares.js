


const catchError=require("../utils/catchError");
const {authors}=require("../models");

exports.existsauthors=catchError(async(req, res, next)=>{
const {id}=req.params;
const author=await authors.findByPk(id);
    
      

if(!author){

  return res.status(404).json({message: `There is no library with that id ${id}`});

}

req.Authors=author;

next()
}) ;