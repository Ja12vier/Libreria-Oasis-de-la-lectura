
const catchError=require("../utils/catchError");
const {authors, books, bookshops, images, genders, data_sheefs}=require("../models")


const getAll=catchError(async(req, res)=>{
const author= await authors.findAll({

        include:[
            {model: books, include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:bookshops} 
        ]}
        ]
    });

    return res.status(200).json({
        status:"sucess",
        result:author.length,
        author
    })
});

const create=catchError(async(req, res)=>{
const {name, descryption }=req.body;
const author=await authors.create({
    name, 
    descryption
    
})
return res.status(200).json({
    status:"sucess",
    result:"thu created un library",
    author
})
});

const getOne=catchError(async(req, res)=>{
const author=await authors.findOne({

    where:{id},
    include:[
        {model: books, include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:bookshops} 
    ]}
    ]
  });   
    
    return res.status(200).json({
        status:"sucess",
        author
    })
});

const remove=catchError(async(req, res)=>{
const {Authors}=req;
const id=Authors.id;
        await authors.destroy({where: {id}})
        return res.status(404).json({
            status:"sucess",
            result:`The library with the ${id} was deleted`

        })
});

const update=catchError(async(req, res)=>{
const {Authors}=req;
const id=Authors.id

const author=await authors.update(
    req.body,
    {where:{id}, returning:true}
)

    return res.status(200).json({
        status:"sucess",
        result:`The library was updated with this  ${id}`,
        author
    })
});

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update
}