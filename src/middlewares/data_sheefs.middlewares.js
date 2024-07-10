

const catchError=require("../utils/catchError");
const {data_sheefs}=require("../models");

exports.existsDataSheefs=catchError(async(req, res, next)=>{
          const {id}=req.params;
    const data_sheef=await data_sheefs.findByPk(id)
        
      if(!data_sheef){
        return res.status(404).json({message: `There is no library with that id ${id}`})
      }

      req.Data_sheefs=data_sheef

      next()
}) ;