
const requect=require("supertest");
const app=require("../app");
const {sequelize}=require("../models");


beforeAll(async()=>{
  
    await sequelize.sync()

   

}, 1000000);

afterAll(async()=>{

    await sequelize.close()
});




test("POST/BOOKS", async()=>{

const book={
    
        "name_books": "galilea", 
        "detail": "trata de un chca enferma", 
        "price":525,
        "quantity": 0,
        "date_publication":"07/03/2024", 
        "price_loans": 15,
        "editors": "martina",
        "imagesId": 1,
        "data_sheefsId": 1 ,
        "gendersId":"1",
        "authorsId":2,
        "status":"activo"
                
        
        }

const res=await requect(app).post("/api/v1/books").send(book);
console.log(res.body);
    expect(res.status).toBe(201)
    expect(res.body.books.detail).toBe(book.detail)
})


test("GET/BOOKS", async()=>{

    const res=await  requect(app).get("/api/v1/books");
      expect(res.status).toBe(200);
    
    });

    // .set("Authorization", `Bearer ${token}`) se usa en el enpoint protegido

    //    userId=res.body.id; se usa  en el post para obtenr su id y despues hacer busqueda

    // token=res.body.token; se usa en el login para obetener su token 

    {/*
    
          const loginUnlock={
        email   : "test1234@gmail.com",
        password : "1234"
    };

    const res=await requect(app)
    .post("/api/v1/users/login")
    .send(loginUnlock)

    token=res.body.token;

    los utilizo dentro del before para loguearme y obetener el token
    */}

    