

const catchError=require("../utils/catchError");
const {carts, books, books_bookshops, sequelize}=require("../models");
const { Op, Transaction } = require("sequelize");


exports.existsCarst=catchError(async(req, res, next)=>{
const {id}=req.params;
const cart=await carts.findByPk(id);
        
if(!cart){

  return res.status(404).json({message: `There is no library with that id ${id}`});

}

req.Carts=cart;

next();
}) ;



exports.createCarts=catchError(async(req, res, next)=>{
  try {
  
 
  const t= await sequelize.transaction();
  const {
    quantity,
    shipments,
    booksId,
    bookshop,
    shipping_address
    }=req.body;
    
  const existBooks= await carts.findOne({where: {booksId}}, {transaction:t});
        
  if(existBooks){

      return res.status(404).json({
        message: "This product already exists in the cart"

    });
  };

  let valorShipment;
  let sub_total;
  let bookshopId;   
  let total_price;
  let users_clientesId=req.user.id;
  let shippind_place;

const buscarBooks= await books.findOne({where:{id:booksId}}, {transaction:t});

if(quantity > buscarBooks.dataValues?.quantity){
    return  res.status(404).json({
      message:"exceeds the quantity of the product available."
  })
};
                                                            


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
     

const buscarBooksBookshop= await books_bookshops.findOne({
    where:{
      [Op.and]: [
  
        {bookId:{[Op.or]: [booksId]}},
        {bookshopId: {[Op.or]: [bookshopId]}},
        {quantity:{[Op.gte]: [quantity]}}
        ]
    }},{transaction:t});
        
  const exictBooksBookshopQuantity= await books_bookshops.findOne({
    where:{
      [Op.and]: [
        
        {bookId:{[Op.or]: [booksId]}},
        {quantity:{[Op.gte]: [quantity]}}
        ]
    }});
  
      
if(buscarBooksBookshop==null){

      if(exictBooksBookshopQuantity==null){
          return res.status(404).json({
            message: "The quantity of that book cannot be found in any bookstore."
        });

      };
         
        return res.status(404).json({
            message: "exceeds the quantity of that book available in the selected bookstore, the book is available in the one presented below",
            bookshopsAvailable:exictBooksBookshopQuantity
        });

        };

     
      
switch(shipments){
case "gratuitous":
  valorShipment= 2; 
  break;
case "standard":
  valorShipment= 3;
  break;  
case "express":
  valorShipment= 5;  
  break; 
case "store pickup":
  valorShipment=1;
  break; 
case "urgent":
  valorShipment=10; 
  break;   
};

if(shipments == "store pickup"){
    
  shippind_place="store pickup"
  
}else{

  shippind_place=shipping_address

};
  

      
     sub_total = buscarBooks.dataValues?.price * quantity;
     total_price=sub_total + valorShipment;

const createCart= await carts.create({
    quantity, sub_total,
    shipments, total_price,
    booksId, users_clientesId,bookshop, shippind_place
  }, {transaction:t});

      await t.commit()

req.Createcart=createCart;

next();

  } catch (error) {
    await t.rollback()

    return res.status(404).json({
       message:"fallo"
    });
  };

});






exports.updateCarts=catchError(async(req, res, next)=>{

  const {quantity, shipments, bookshop}=req.body;
  const {id}=req.params;

  let valorShipment;
  let sub_total;
  let bookshopId;   
  let total_price;

                            

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
   
   
   const seeksCart=await carts.findOne({where:{id},
       attributes:["booksId"], raw: true}
   );
   

   const buscarBooksBookshop= await books_bookshops.findOne({
      where:{
        [Op.and]: [
    
          {bookId:{[Op.or]: [seeksCart.booksId]}},
          {bookshopId: {[Op.or]: [bookshopId]}},
          {quantity:{[Op.gte]: [quantity]}}
          ]
    }});
      

    
    if(buscarBooksBookshop==null){  
       
        return res.status(404).json({
          message: "exceeds the quantity of this book available in the selected bookstore",

        })
      };
   

    
   switch(shipments){
    case "gratuitous":
      valorShipment= 2; 
      break;
    case "standard":
      valorShipment= 3;
      break;  
    case "express":
      valorShipment= 5;  
      break; 
    case "store pickup":
      valorShipment=1;
      break; 
    case "urgent":
      valorShipment=10; 
      break;   
   };

   const buscarBooks= await books.findOne({where:{id:seeksCart.booksId},
        attributes:["quantity", "price"],
        raw:true
      });

      if(quantity > buscarBooks.quantity){
          return  res.status(404).json({
          message:"exceeds the quantity of the product available."
        })
      };

    
   sub_total = buscarBooks.price * quantity;
    total_price=sub_total + valorShipment;

        const updateCart= await carts.update({
            quantity, sub_total,
            shipments, total_price,
            bookshop
        },{ where:{id}, returning:true});

  
    req.updateCarts=updateCart[1];
  
    next()

});