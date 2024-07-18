
const express=require("express");
const usersRoutes = require("./users_clientes.routes");
const bookshopsRouter = require("./bookshop.routes");
const gendersRouter = require("./genders.routes");
const booksRouter = require("./books.routes");
const authorsRouter = require("./authors.routes");
const cartsRouter = require("./carts.routes");
const dataSheefsRouter = require("./data_sheefs.routes");
const imagesRouter = require("./images.routes");
const books_bookshopRouter = require("./books_bookshops.routes");
const shoppindsRouter = require("./shoppinds.routes");
const loansRouter = require("./loans.routes");
const paypalRouter = require("./paypal.routes");
const commentsRouter = require("./comments.routes");
const routes=express.Router();

//ruta
routes.use("/users_clientes", usersRoutes)
routes.use("/bookshops", bookshopsRouter)
routes.use("/genders", gendersRouter)
routes.use("/books", booksRouter)
routes.use("/authors", authorsRouter)
routes.use("/carts", cartsRouter)
routes.use("/data_sheefs", dataSheefsRouter)
routes.use("/images", imagesRouter)
routes.use("/books_bookshops", books_bookshopRouter)
routes.use("/shoppinds", shoppindsRouter)
routes.use("/loans", loansRouter)
routes.use("/payment", paypalRouter)
routes.use("/comments", commentsRouter)

module.exports=routes