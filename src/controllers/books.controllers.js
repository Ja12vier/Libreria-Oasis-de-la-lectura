
const catchError=require("../utils/catchError");
const {books, authors, data_sheefs, images, genders,bookshops, books_bookshops  }=require("../models");
const { Op, where } = require("sequelize");


const getAll=catchError(async(req, res)=>{

const todoBooks= await books_bookshops.findAll();    
const bookBookshop=await todoBooks.map((product)=>product.dataValues);

const {name_books, editors, status,authorName, data_sheefsEan }=req.query;

for(let i=0; i < bookBookshop.length; i++){

let idBooks=[];
const  booksId=bookBookshop[i].bookId;

if(!idBooks.includes(booksId)){

const  booksFilter=bookBookshop.filter((value)=>{
    return value.bookId==booksId
});

const sumaQuantity=booksFilter.reduce((value, currenValue)=>{
    return value + currenValue.quantity
    }, 0);

    await books.update({quantity: sumaQuantity}, {where:{id:booksId}});

   idBooks.push(booksId);

};

};

let whereBooks={};

if(name_books) whereBooks.name_books={[Op.like]: `%${name_books}%` };

if(editors) whereBooks.editors= editors;

if(status) whereBooks.status= status;

let whereAuthors={};

if(authorName) whereAuthors.name={[Op.like] : `%${authorName}%`};

let whereData_sheefs={};

if(data_sheefsEan) whereData_sheefs.ean={[Op.like] : `%${data_sheefsEan}%`}

const bookUpdateQuantity= await books.findAll({
where: whereBooks,
include:[
{ model: authors, where: whereAuthors},
{ model: data_sheefs, where: whereData_sheefs},
{ model: images},
{ model: genders},
{ model: bookshops}
]

}

);


return res.status(200).json({
status:"sucess",
result:bookUpdateQuantity.length,
bookUpdateQuantity
});

});

const create=catchError(async(req, res)=>{
    const {name_books, detail, 
    price, date_publication, quantity,
    editors, imagesId, 
    data_sheefsId, status, authorsId,
    gendersId  }=req.body;
          
const  price_loans= price * (2 / 100);
     
const book=await books.create({
    name_books, detail, 
    price, date_publication, quantity,
    price_loans, editors, imagesId, 
    data_sheefsId, status, authorsId,
    gendersId
});

return res.status(200).json({
    status:"sucess",
    result:"thu created un library",
    book
});
});


const getOne=catchError(async(req, res)=>{
const {id}=req.params;

const book= await books.findByPk(id, { 
    include:[
        { model: authors},
        { model: data_sheefs},
        { model: images},
        { model: genders}
          ]
});

if(!book){

    return res.status(404).json({message: `There is no library with that id ${id}`});

}

return res.status(200).json({
    status:"sucess",
    book
});

});

const remove=catchError(async(req, res)=>{

    const {Books}=req;
    const id=Books.id;
    await books.destroy({where: {id}})
    return res.status(404).json({
        status:"sucess",
        result:`The library with the ${id} was deleted`

    });
});

const update=catchError(async(req, res)=>{
const {Books}=req;
const id=Books.id

const book=await books.update(
    req.body,
    {where:{id}, returning:true}
);

return res.status(200).json({
    status:"sucess",
    result:`The library was updated with this  ${id}`,
    book
});
});

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update
}