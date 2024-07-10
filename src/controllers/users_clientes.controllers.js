
const catchError=require("../utils/catchError");
const {users_clientes}=require("../models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {carts} = require("../models");

const getAll=catchError(async(req, res)=>{
const Users_clientes= await users_clientes.findAll();
   
    return res.status(200).json({
        status:"success",
        result: Users_clientes.length,
        Users_clientes
    })
});

const create=catchError(async(req, res)=>{
const {name_cliente, last_name, phone, email, password, province, city}=req.body;
const Users_cliente=await users_clientes.create({
        name_cliente,
        last_name,
        phone,
        email,
        password,
        province,
        city
});

    return res.status(200).json({
        status:"seccess",
        result: "you created a user",
        Users_cliente
    })
});

const getOne=catchError(async(req, res)=>{
const {Users_cliente}=req;

      return res.status(200).json({
        status:"success",
        Users_cliente
      })
});


const remove=catchError(async(req, res)=>{
const {Users_cliente}=req;
const id=Users_cliente.id;
  
      await users_clientes.destroy({where:{id}})

      return res.status(404).json({
        status:"success",
        result:"you delete a user"
      })
    
});

const update=catchError(async(req, res)=>{
const {Users_cliente}=req;
const id=Users_cliente.id;

delete req.body.email;
delete req.body.password;

const user_cliente= await users_clientes.update(
    req.body,
    {where:{id}, returnig:true}
);
   return res.status(200).json({
    status:"success",
    result:`the user was update with the ${id}`,
    user_cliente
    

   })
});


const updatePassword=catchError(async(req, res)=>{

const {email, password, newPassword}=req.body;
const buscarUsers= await users_clientes.findOne({where:{email}});
console.log(buscarUsers);
const id=buscarUsers.dataValues.id;
  
const isValidPassword= await bcrypt.compare(password,buscarUsers.dataValues?.password)
console.log(isValidPassword);
if(!isValidPassword){

    return  res.status(404).json({message: "There is no user with that password"})
};
    await buscarUsers.update({password:newPassword, where:{id} })

return res.status(200).json({
status:"success",
result:"password was update" 
   })
  })

const login=catchError(async(req, res)=>{
const {password, email}=req.body;
  

const user=await users_clientes.findOne({where: {email}})

if(!user) return res.status(404).json({message: "There is no user with that email"})

const isValidPassword=await bcrypt.compare(password, user.dataValues.password)

if(!isValidPassword) return res.status(404).json({message:"invalid password"})

const token=jwt.sign(
{user},
process.env.TOKEN_SECRET,
{expiresIn:"5d"}
)


  return res.status(200).json({
    status:"success",
    result:"section has started",
    user,
    token
  })
})

module.exports={

    getAll,
    getOne,
    create,
    remove,
    update,
    updatePassword,
    login
}