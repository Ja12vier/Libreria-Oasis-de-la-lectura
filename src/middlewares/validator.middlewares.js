
const {body, validationResult}=require("express-validator");
const {users_clientes, bookshops}=require("../models");



const validationField=(req, res, next)=>{
const errors=validationResult(req);

if(!errors.isEmpty()){
    
    return res.status(400).json({
        status:"error",
        errors: errors.array()
    })
}

next()
};


exports.users_clientesValidation=[
body("email").isEmail().notEmpty().withMessage("must be email type")

.custom(async(value)=>{
        
    const buscarEamil=await users_clientes.findOne({where: {email:value}});
        
    if(buscarEamil){
        throw new Error("el email ya existe")
    }
}),

body("password").notEmpty().isLength({max:12, min:6}).withMessage("The password must be secure, with a minimum of 6 characters and a maximum of 12"),
    validationField
];

exports.bookshopsValidation=[
body("name").notEmpty().withMessage("this field can not be blank")

.custom(async(value)=>{

    const exictName= await bookshops.findOne({where: {name:value}});

    if(exictName){
    
        throw new Error("this library already exists")
    }
}),
 validationField

]

exports.booksValidator=[
body("price").notEmpty().isNumeric().withMessage("It has to be a number and the field cannot be empty."),
body("price_loans").notEmpty().isNumeric().withMessage("It has to be a number and the field cannot be empty."),
validationField

]


exports.loansValidator=[
body("phone").notEmpty().isLength({max:12, min:10}).withMessage("It has to be a phone number"),
body("identification_card").notEmpty().isLength({max:12, min:11}).withMessage("It must be a valid ID"),
validationField

]