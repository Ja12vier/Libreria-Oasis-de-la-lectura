


const catchError=require("../utils/catchError");
const {books_bookshops}=require("../models");



const getAll=catchError(async(req, res)=>{
const books_bookshop= await books_bookshops.findAll()

    return res.status(200).json({
        books_bookshop
    })
});

const create=catchError(async(req, res)=>{
const books_bookshop=await books_bookshops.create(req.body);

   return res.status(200).json({
       status:"sucess",
       result:"thu created un library",
       books_bookshop
   })
});


module.exports={
    create,
    getAll
}