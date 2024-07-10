
const catchError=require("../utils/catchError");
const {images}=require("../models");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");



const getAll=catchError(async(req, res)=>{
const image=await images.findAll();

    return res.status(200).json({
      status:"sucess",
      result:image.length,
      image
    })
});


const create=catchError(async(req, res)=>{
const {path, filename}=req.file;

const {url, public_id}=await uploadToCloudinary(path, filename);

const image= await images.create({
  url, publicId:public_id
});
   
   return  res.status(201).json({
    status:"sucess",
    image
   })

});

const remove=catchError(async(req,  res)=>{
const {id}=req.params;

const image= await images.findByPk(id);

if(!image) return res.sendStatus(404);

  await deleteFromCloudinary(image.publicId)

  await image.delete();

  return res.sendStatus(204).json({
    status:"suceess",
    result:"delete images"
  })
});


module.exports={
    getAll,
    create,
    remove
}