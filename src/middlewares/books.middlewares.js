

const catchError=require("../utils/catchError");
const {books, Sequelize}=require("../models");
const { Op } = require("sequelize");

exports.existsBooks=catchError(async(req, res, next)=>{
const {id}=req.params;
const book=await books.findByPk(id)
        
if(!book){

  return res.status(404).json({message: `There is no library with that id ${id}`});

};

req.Books=book

next()
});

exports.quantityDisponible=catchError(async(req, res, next)=>{

     
    await books.update({status:"inactivo"}, {where:{quantity:0}})

next()
});


