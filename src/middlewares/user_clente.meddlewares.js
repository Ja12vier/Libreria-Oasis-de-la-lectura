
const catchError=require("../utils/catchError");
const {users_clientes}=require("../models");

exports.existsUser_cliente=catchError(async(req, res, next)=>{
          const {id}=req.params;
    const users_cliente=await users_clientes.findByPk(id)
        
      if(!users_cliente){
        return res.status(404).json({message: `the user whit that ${id} doest not exist`})
      }

      req.Users_cliente=users_cliente

      next()
})  