
const catchError=require("../utils/catchError");
const {genders, books, images, data_sheefs, authors, bookshops}=require("../models");
const { Op } = require("sequelize");

const getAll=catchError(async(req, res)=>{
const {name_gender}=req.query;
const whereGenero={};      

if(name_gender) whereGenero.name_gender={[Op.iLike]: `%${name_gender}%`};

const gender= await genders.findAll({
    where:whereGenero,
    include:[
        { model:books, include:[{model:images}, {model:data_sheefs}, {model:authors}, {model:bookshops} ]}
    ]
});
    
    return res.status(200).json({
        status:"sucess",
        result:gender.length,
        gender
    })
});

const create=catchError(async(req,  res)=>{  
const {name_gender}=req.body;

const gender= await genders.create({
    name_gender


});

    return  res.status(201).json({
        status:"sucess",
        gender
    })
});

const getOne=catchError(async(req, res)=>{
const {id}=req.params;

const gender= await genders.findOne({
    where:{id},
    include:[
        { model:books, include:[{model:images}, {model:data_sheefs}, {model:authors}, {model:bookshops} ]}
     ]
});

if(!gender){

    return res.status(404).json({message: `There is no genders with that id ${id}`})
}
    return res.status(200).json({
        status:"sucess",
        gender
    })

});


const remove=catchError(async(req, res)=>{
const {Genders}=req;
const id=Genders.id;

    await  Genders.destroy({where:{id}})

    return res.status(404).json({
        status:"sucess",
        result:"you eliminated a genres"
    })
});

const update=catchError(async(req, res)=>{
const {Genders}=req;
const id=Genders.id;

const gender=  await genders.update(
    req.body,
    {where: {id}, returning:true}
);

    return res.status(200).json({
        status:"sucess",
        result:"a genders was update",
        gender

    })
});


module.exports={
    getAll,
    create,
    getOne,
    update,
    remove
}

