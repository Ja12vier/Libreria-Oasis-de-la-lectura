
const catchError=require("../utils/catchError");
const {shoppinds,carts, books_bookshops, sequelize}=require("../models");
const { Op, Transaction, where } = require("sequelize");
const { Sequelize}=require("../models");



const getShoppinds=catchError(async(req, res)=>{
const users_clientesId=req.user.id;

const shoppind= await shoppinds.findAll({
    where: {users_clientesId}
});

  return res.status(200).json({
    status:"sucess",
    result:shoppind.length,
    shoppind
  });
});

const createShoppinds=catchError(async(req, res)=>{
try {

const users_clientesId=req.user.id;
const t= await sequelize.transaction();

const cart= await carts.findAll({
    where:{users_clientesId},
    attributes:["quantity", "sub_total",  
    "shipments", "total_price", "booksId", 
    "users_clientesId", "bookshop", "shippind_place"],
    raw:true
}, {transaction:t})

if(!cart.length){

  return res.status(404).json({
    message:"Your cart is probably empty."
  })

};
 
for(let i=0; i < cart.length; i++){

const bookshop=cart[i].bookshop;
const quantity=cart[i].quantity;
const bookId=cart[i].booksId;
     


let bookshopId;

switch(bookshop){
    case "oasis_1":
      bookshopId= 1; 
      break;
    case "oasis_2":
      bookshopId= 2;
      break;  
    case "oasis_3":
      bookshopId= 3;  
      break; 
    case "oasis_4":
      bookshopId=4;
      break; 
      
    };
      
const bookBookshop= await books_bookshops.findAll({
    where:{
      [Op.and]:[
    
          {bookId:{[Op.or]:[bookId]}},
          {bookshopId:{[Op.or]:[bookshopId]}},
          {quantity:{[Op.gte]:[quantity]}}
        ]
      },

    attributes:["id", "quantity", "bookId","bookshopId"],
    raw:true
}, {transaction:t});
       
           
if(!bookBookshop.length){

  return res.status(404).json({
    message:"probably exceeds the quantity of the book available in this bookstore"
  });

};
      
       
  bookBookshop.map(async(libro)=>{
const id=libro.id;
const newQuantity=libro.quantity  - quantity;
    await books_bookshops.update(
    {quantity: newQuantity}, {where:{id},returning:true}, {transaction:t}
);

    return true
  });

    };
                           
const shoppindCart=  await shoppinds.bulkCreate(cart,{transaction:t});
    await carts.destroy({where: {users_clientesId}}, {transaction:t});
    await t.commit();

    return res.status(200).json({

    status: "sucess",
    message:"your cart has been purchased with existo",
    shoppindCart
  });

    } catch (error) {

    await t.rollback();

    return res.status(404).json({
      message:"failed"
    });
  };

});


const removeShoopinds=catchError(async(req,res)=>{
const {id}=req.params;

   await shoppinds.destroy({where:{id}});

   return res.status(404).json({
    message:`The purchase with the ID was deleted ${id}`
   });
});

module.exports={
    createShoppinds,
    removeShoopinds,
    getShoppinds
};