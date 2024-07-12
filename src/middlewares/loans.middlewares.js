

const catchError=require("../utils/catchError");
const {loans, books, bookshops, books_bookshops, users_clientes}=require("../models");
const {differenceInDays, isBefore}=require("date-fns");
const { Op } = require("sequelize");
const { isEqual } = require("date-fns/isEqual");
const { raw } = require("express");

exports.loansExists=catchError(async(req, res, next)=>{

const {id}=req.params;
const loan=await loans.findByPk(id);
 

      if(!loan){
        return res.status(404).json({message: `There is no loans with that id ${id}`})
      }

      req.Loans=loan

      next()
});


exports.loansCreate=catchError(async(req, res, next)=>{
    
const { name, sur_name,
    email, phone,
    identification_card,
    quantity, shipment, 
    date_return, bookshop, 
    bookId, status, shipping_address }=req.body;
       


let  valorShipment=0;
let  bookshopId;
let date_loans= new Date()
const users_clienteId= req.user.id;
let shippind_place=""

const buscarBooks= await books.findOne({where: {id:bookId}});

        if(quantity >  buscarBooks.dataValues?.quantity){
                return res.status(404).json({
                message:"exceeds the quantity of the product available."
                })
        };

    switch(shipment){
        case "gratuitous":
        valorShipment=2;
        break;
        case "standard":
        valorShipment=3;
        break;  
        case "express":
        valorShipment=5;
        break;
        case "store pickup":
        valorShipment=1;
        break;
        case "urgent" :
        valorShipment=10;
        break;
        
    default:{
        return res.status(400).json({
            message:"It must be a valid shipping method"
                })
            };
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

                default:{
                    return res.status(400).json({
                      message:"It must be a valid library"
                           })
                        };
            };


const buscarBooksBookshop= await books_bookshops.findOne({
    where:{
        [Op.and]:[

            {quantity:{[Op.gte]:[quantity]}},
            {bookId:{[Op.or]:[bookId]}},
            {bookshopId:{[Op.or]:[bookshopId]}}
        ]
    },
    attributes:["id", "quantity", "bookId","bookshopId"],
    raw:true
});
  


const exictBooksBookshopQuantity= await books_bookshops.findOne({
    where:{
        [Op.and]: [

            {quantity:{[Op.gte]:[quantity]}},
            {bookId:{[Op.or]:[bookId]}}
        ]
    }
});


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

}else if(isBefore(date_return, date_loans)){ //devuelve true si la primera fecha es posterior a la segunda
    return res.status(422).json({
      message:"It must be a later date"
});

}else if(isEqual(date_return, date_loans)){ //devueve true si la primera fecha es igual a la segunda
    return res.status(422).json({
      message:"It must be a later date"
});

}else if(shipment != "store pickup" && shipping_address.length==0){

    return res.status(404).json({
      message:`yes mark ${shipment} the  "shipping_address" It shouldn't be empty`
    });

}; 
    
if(shipment == "store pickup"){
    
    shippind_place="store pickup"
    
}else{

    shippind_place=shipping_address

};
    
                
            

       // devuelve la cantidad de dia de diferencia entre la primera fecha y la segunda tambien 
       //la puede devover en negativo solo invierte la fecha
const diaDiferecias=differenceInDays(new Date(date_return), new Date(date_loans));

const  sub_total= (buscarBooks.dataValues?.price_loans * quantity) ;
const  total_price= (diaDiferecias * sub_total) + valorShipment;


        
        
const createLoans= await loans.create({
    name, sur_name,  email,
    phone, identification_card,
    quantity, shipment, sub_total,
    total_price, date_loans,
    date_return, bookshop,
    users_clienteId, bookId, shippind_place, status
});
   
    
const id=buscarBooksBookshop.id
const newQuantity=buscarBooksBookshop.quantity  - quantity ;
    await books_bookshops.update(
    {quantity: newQuantity}, {where:{id},returning:true}
    );


req.loan=createLoans;
next()

});


exports.updateAdministratorLoans=catchError(async(req, res, next)=>{
    
const {id}=req.params;
const {status}=req.body;
const email=req.user.email;

const loanOne=await loans.findOne({
    where: {id}
});
              
if(!loanOne){
   return res.status(404).json({message: `There is no loans with that id ${id}`});
};


const users=await users_clientes.findOne({
    where: {
        [Op.and]:[

            {email:{[Op.or]:[email]}},
            {name_cliente: "javier"},
            {email:'javierne233@gmail.com'},
            {password:'$2b$10$VFiF5jmtfEWY4EmAZ7aLsevIvzFEYIpu4XmLlHhccp2ztb1ClPLPO'}//emma25 es este password
        ]
            }
    
    });

                     
if(loanOne?.dataValues.status == false){
  return res.status(405).json({
    message:"this book has already been delivered"
});

}else if(users === null){
  return res.status(403).json({
    message:"Only the administrator can do this app"

    });
            };
let valorShipment=0;

switch(loanOne.dataValues.shipment){
        case "gratuitous":
        valorShipment=2;
        break;
        case "standard":
        valorShipment=3;
        break;  
        case "express":
        valorShipment=5;
        break;
        case "store pickup":
        valorShipment=1;
        break;
        case "urgent" :
        valorShipment=10;
        break;
    };

const newdate_loans= new Date();
const date_loans=loanOne.dataValues.date_loans;
const date_return=loanOne.dataValues.date_return;
const diaRestrasoEntrega=differenceInDays(new Date(newdate_loans), new Date(date_return));
const diaRestanteEntrega=differenceInDays(new Date(date_return), new Date(newdate_loans));
//const diaDiferencias=differenceInDays(new Date(date_return), new Date(date_loans));

const price_loan=(loanOne.dataValues?.sub_total / loanOne.dataValues?.quantity) * 1.7 


if(diaRestrasoEntrega > 0 ){
    const priceDiaRetraso=  diaRestrasoEntrega * price_loan;
    const priceTotal=priceDiaRetraso + Number(loanOne.dataValues?.total_price) ; 

    const pagoAnterior=Number(loanOne.dataValues?.total_price);
    const loansUpdate=await loans.update({total_price: priceTotal, date_return: new Date() }, {where:{id}, returning:true}, );
    let loansUpdates= loansUpdate[1];
    
     return res.status(200).json({
        status:"Cobrar al  cliente",
        message: `El cliente ${loanOne.dataValues?.name} tiene un retraso de ${diaRestrasoEntrega} dias y tendra que pagar ${priceDiaRetraso}$. tambien se actualizo la date_return o fecha`,
        pagoAnterior,
        nuevoPago:priceDiaRetraso,
        loansUpdates


    });

}else if(diaRestanteEntrega > 0 && date_loans != newdate_loans ){
    
    const price_loan=(Number(loanOne.dataValues?.sub_total)  * diaRestanteEntrega) + valorShipment;
    const loansUpdate=await loans.update({total_price: price_loan, date_return: new Date() }, {where:{id}, returning:true}, );
    const pagoCobradoAnterior=Number(loanOne.dataValues?.total_price);
    let loansUpdates=loansUpdate[1]

    return res.status(200).json({
        status:"Solo se cobrara los dia usado ",
        message: `El cliente ${loanOne.dataValues?.name} entrego el libro antes de la fecha de entrega  `,
        pagoAnterior:pagoCobradoAnterior,
        nuevoPago:price_loan,
        loansUpdates

    });

}else if(date_loans == newdate_loans){

    const price_loan=(loanOne.dataValues?.sub_total / loanOne.dataValues?.quantity) + valorShipment;

    const loansUpdate=await loans.update({total_price: price_loan, date_return: new Date() }, {where:{id}, returning:true}, );
    const pagoCobradoAnterior=loanOne.dataValues?.total_price;
    const loansUpdates=loansUpdate[1];

    return res.status(200).json({
        status:"Only the days used will be charged. ",
        message: `The client ${loanOne.dataValues?.name} I deliver the book before the delivery date `,
        pagoAnterior:pagoCobradoAnterior,
        nuevoPago:price_loan,
        loansUpdates

    });

};


  //actualizar el status
const updateLoans=await loans.update({status: status}, {where: {id}, returning:true});     
          
const bookId=loanOne.dataValues.bookId;
const bookshops=loanOne.dataValues.bookshop;
let quantityLoanOne=loanOne.dataValues.quantity;
let bookshopId;

     switch(bookshops){
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

        default:{
            return res.status(400).json({
              message:"It must be a valid library"
                   })
                };
    };

const bookBookshopOne= await books_bookshops.findOne({
    where:{
        [Op.and]: [

            {bookshopId:{[Op.or]:[bookshopId]}},
            {bookId:{[Op.or]:[bookId]}}
        ]
    },
    attributes:['id', 'quantity', 'bookshopId'],
    raw:true
    });
      
const sumaQuantity=bookBookshopOne.quantity + quantityLoanOne;
 let idBooksBook=bookBookshopOne.id;

            if(!updateLoans[1].length){
                return res.status(404).json({
                    message: "error updating status"
                    });
                        };

    //actualizar la cantidad del libro disponible
    await books_bookshops.update({quantity: sumaQuantity}, {where: {id:idBooksBook}})
         


  req.updateLoan=updateLoans[1];

  next();
})



exports.removeLoans=catchError(async(req, res, next)=>{

const {id}=req.params;
const loan=await loans.findOne({where:{id}});

if(!loan){

    return res.status(404).json({
        message: `There is no loans with that id ${id}`});

}else if(!loan.dataValues.status){

    return res.status(406).json({
        message:"The loan cannot be deleted until its status is false, which means book delivered" 
    });

};

   
req.id=id;

next()
})



