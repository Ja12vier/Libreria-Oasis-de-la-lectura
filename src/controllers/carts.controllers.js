


const catchError=require("../utils/catchError");
const {carts, images, data_sheefs, genders, authors, bookshops, users_clientes}=require("../models");
const { raw } = require("express");


const getAll=catchError(async(req, res)=>{
    const users_clienteId= req.user.id;
    const cart= await carts.findAll({
        where:{users_clienteId},
        include:[
            {model:books,  include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:authors},  {model:bookshops}]},
            {model: users_clientes}
        ]
     
    })
    return res.status(200).json({
        status:"sucess",
        result:cart.length,
        cart
    })
});

const create=catchError(async(req, res)=>{
     const {Createcart}=req;
  
   
 
    return res.status(200).json({
        status:"sucess",
        result:"thu created un library",
        Createcart
    });
});

const getOne=catchError(async(req, res)=>{

    const {id}=req.params;
    const cart=await carts.findOne({where:{id},
        attributes:["booksId"], raw: true}
    )
    
      if(!cart){
        return res.status(404).json({message: `There is no library with that id ${id}`})
      }


    return res.status(200).json({
        status:"sucess",
        cart
    })
});

const remove=catchError(async(req, res)=>{

    const {Carts}=req;
    const id=Carts.id;
    await carts.destroy({where: {id}})
    return res.status(404).json({
        status:"sucess",
        result:`The library with the ${id} was deleted`

    })
});

const update=catchError(async(req, res)=>{
    const {updateCarts}=req;
    const {id}=req.params;
    
    return res.status(200).json({
        status:"sucess",
        result:`The library was updated with this  ${id}`,
        updateCarts
    })
});

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update
}