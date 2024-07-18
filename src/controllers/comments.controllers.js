
const catchError=require("../utils/catchError");
const {comments}=require("../models");


const getAll=catchError(async(req, res)=>{

const comment= await comments.findAll()

 return res.status(200).json({
    status:"sucess",
    result:comment.length,
    comment

 });

});

const create=catchError(async(req, res)=>{
const {title, description, rating, bookId, summary}=req.body;

const comment= await comments.create({
    title,
    description,
    rating,
    summary,
    bookId
 });

 return res.status(201).json({
    status:"sucess",
    result:"thu created un comment",
    comment
 })

});


const remove=catchError(async(req, res)=>{
    const {id}=req;
    
        await  comments.destroy({where:{id}})
    
        return res.status(404).json({
            status:"sucess",
            result:"you eliminated a comment"
        });
    });
    

    module.exports={
        getAll,
        create,
        remove
    }