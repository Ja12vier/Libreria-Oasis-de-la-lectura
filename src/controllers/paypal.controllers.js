
const catchError=require("../utils/catchError");
const axios=require("axios");
const {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET}=require("../utils/paypal");
const { HOST } = require("../utils/host");


const createOrder=catchError(async(req, res)=>{
const {total_value, currency }=req.body;
const order={
    intent:"CAPTURE",
    purchase_units:[
        {
            amount:{
                currency_code:currency,
                value:total_value
            }
        },
    ],

    application_context:{
        brand_name:"oasis de la lectura",
        landing_page:"NO_PREFERENCE",
        user_action:"PAY_NOW",
        return_url:`${HOST}/capture-order`,
        cancel_url:`${HOST}/cancel-order`
    }
}


const params= new URLSearchParams();
params.append("grant_type", "client_credentials");
const {data:{access_token}}=await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
    auth:{
        username:PAYPAL_API_CLIENT,
        password:PAYPAL_API_SECRET
    }
});



const respon= await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers:{
        Authorization: `Bearer ${access_token}`
    }
});


return res.status(201).json(respon.data)
});





const captureOrder=async(req, res)=>{
const {token}=req.query;

const response= await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{}, {
        auth:{
            username:PAYPAL_API_CLIENT,
            password:PAYPAL_API_SECRET
        }
    });
    
    return res.status(200).json(response.data)
};



const cancelPayment=async(req, res)=>{

    return res.status(404).json({
        message:"El pago a sido cancelado"
    })
};


module.exports={
    createOrder,
    captureOrder,
    cancelPayment
}

