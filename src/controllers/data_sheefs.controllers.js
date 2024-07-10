


const catchError=require("../utils/catchError");
const {data_sheefs, authors}=require("../models");


const getAll=catchError(async(req, res)=>{

    const data_sheef= await data_sheefs.findAll({
        include:[
            {model: authors}
        ]
    })
    return res.status(200).json({
        status:"sucess",
        result:data_sheef.length,
        data_sheef
    })
});

const create=catchError(async(req, res)=>{
     const {ean, editorial,
        trasnlator, format,
        country_publication, lenguajes,
        dimensions, peso, number_page,
        date_publication, materias,
        authorsId
        }=req.body;
  
    const data_sheef=await data_sheefs.create({
        ean, editorial,
        trasnlator, format,
        country_publication, lenguajes,
        dimensions, peso, number_page,
        date_publication, materias,
        authorsId
    })
    return res.status(200).json({
        status:"sucess",
        result:"thu created un library",
        data_sheef
    })
});

const getOne=catchError(async(req, res)=>{

    const {Data_sheefs}=req;

    return res.status(200).json({
        status:"sucess",
        Data_sheefs
    })
});

const remove=catchError(async(req, res)=>{

    const {Data_sheefs}=req;
    const id=Data_sheefs.id;
    await data_sheefs.destroy({where: {id}})
    return res.status(404).json({
        status:"sucess",
        result:`The library with the ${id} was deleted`

    })
});

const update=catchError(async(req, res)=>{
    const {Data_sheefs}=req;
    const id=Data_sheefs.id;

    const data_sheef=await data_sheefs.update(
        req.body,
        {where:{id}, returning:true}
    )

    return res.status(200).json({
        status:"sucess",
        result:`The library was updated with this  ${id}`,
        data_sheef
    })
});

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update
}