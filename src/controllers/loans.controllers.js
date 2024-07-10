
const catchError=require("../utils/catchError");
const {loans, users_clientes, books, images, data_sheefs, genders, authors, bookshops}=require("../models");


const getAll=catchError(async(req, res)=>{
const  users_clienteId=req.user.id;

const loan= await loans.findAll({
    where:{users_clienteId},
    include:[
        {model:books,  include:[{model:images}, {model:data_sheefs}, {model:genders}, {model:authors},  {model:bookshops}]},
        {model: users_clientes}
    ]
    
});

    return res.status(200).json({
        status:"sucess",
        result:loan.length,
        loan
    });
});

const create=catchError(async(req,  res)=>{
const {loan}=req;
   

    return  res.status(201).json({
        status:"sucess",
        loan
    });
});



const remove=catchError(async(req, res)=>{
const {id}=req;

    await  loans.destroy({where:{id}})

    return res.status(404).json({
        status:"sucess",
        result:"you eliminated a loans"
    });
});


const updateLoanStatus=catchError(async(req, res)=>{
const {updateLoan}=req;

    return res.status(200).json({
        status:"sucess",
        result:"Your loans have been updated to false status",
        updateLoan

    })
});


module.exports={
    getAll,
    create,
    remove,
    updateLoanStatus
}