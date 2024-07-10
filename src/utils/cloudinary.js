





const cloudinary=require("cloudinary").v2;
const path=require("path");
const fs=require("fs");

cloudinary.config({
   
 cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
 api_key:process.env.CLOUDINARY_API_KEY,
 api_secret:process.env.CLOUDINARY_API_SECRET

});

const uploadToCloudinary=async(localFilePath, filename)=>{
    try {

        var folder= "image_cruise"
        var filePathOnCloudinary = folder + "/" + path.parse(filename).name;
        
        const result= await cloudinary.uploader.upload(
            localFilePath,
            {"public_id": filePathOnCloudinary}
        )
        return result
    } catch (error) {
        console.log(error)
        return {message: "upload to cloudinary faile"}
    }finally{
        fs.unlinkSync(localFilePath)
    }
}


const deleteFromCloudinary= async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
        return {message:" delete on cloudinary  faile"}
    }
}

module.exports= {uploadToCloudinary, deleteFromCloudinary}
