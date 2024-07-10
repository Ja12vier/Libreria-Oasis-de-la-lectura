

const catchError=require("../utils/catchError");
const {genders}=require("../models");

exports.existsGenders=catchError(async(req, res, next)=>{
          const {id}=req.params;
    const gender=await genders.findByPk(id)
        
      if(!gender){
        return res.status(404).json({message: `There is no genders with that id ${id}`})
      }

      req.Genders=gender

      next()
}) ;