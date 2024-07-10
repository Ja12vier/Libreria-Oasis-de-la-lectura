const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app=express()

//middlewares

app.use(express.json())
app.use(helmet({
    crossOriginIsolated:false
}))

app.use(cors())

//ruta
app.use("/api/v1", routes)

//errorr

app.use(errorHandler)

module.exports=app