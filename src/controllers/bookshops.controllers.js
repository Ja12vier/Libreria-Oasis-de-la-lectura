
const catchError=require("../utils/catchError");
const {bookshops, books_bookshops, books, images, data_sheefs, genders, authors}=require("../models");





const getAll=catchError(async(req, res)=>{
const bookshop= await bookshops.findAll({
    include:[
        {model:books,  include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:authors}]}
    ]
})
    return res.status(200).json({
        
        status:"sucess",
        result:bookshop.length,
        bookshop

    })
});

const create=catchError(async(req, res)=>{
const {name, province, city}=req.body;
const bookshop=await bookshops.create({
    name, 
    province, 
    city
    })
    return res.status(201).json({
        status:"sucess",
        result:"thu created un library",
        bookshop
    })
});

const getOne=catchError(async(req, res)=>{
const {id}=req.params;
const bookshop= await  bookshops.findOne({
    where:{id},
    include:[
        {model:books,  include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:authors}]}
    ]
});

    return res.status(201).json({
        status:"sucess",
        bookshop
    });
});

const remove=catchError(async(req, res)=>{

const {Bookshops}=req;
const id=Bookshops.id;
    await bookshops.destroy({where: {id}})
    return res.status(404).json({
        status:"sucess",
        result:`The library with the ${id} was deleted`

    })
});

const update=catchError(async(req, res)=>{
const {Bookshops}=req;
const id=Bookshops.id

const bookshop=await bookshops.update(
    req.body,
    {where:{id}, returning:true}
)

    return res.status(200).json({
        status:"sucess",
        result:`The library was updated with this  ${id}`,
        bookshop
    })
});
const setBooksBookshops=catchError(async(req, res)=>{
const {id}=req.params;   
const {bookId, quantity}=req.body;
const book=await books.findOne({where: {id:bookId}});
const bookshop=await bookshops.findOne({where: {id}});

    if(!books || !bookshop) return res.status(404).json({message: "the book or library is null"})
const bookBookshop=await  bookshop.addBooks(book, {through: {quantity}});
        
    return res.status(200).json({
        status:"sucess",
        bookBookshop
    })
  })

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,
    setBooksBookshops
}