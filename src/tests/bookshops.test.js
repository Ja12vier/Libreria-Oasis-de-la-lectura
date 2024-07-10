
const requect=require("supertest");
const {sequelize}=require("../models");
const app=require("../app");

beforeAll(async()=>{

    await sequelize.sync()
    
}, 1000000);

afterAll(async()=>{

    await sequelize.close()
});

test("GET/BOOKSHOPS", async()=>{

const res=await  requect(app).get("/api/v1/bookshops");
  expect(res.status).toBe(200);

});

test("POST/CREATE BOOKSHOPS", async()=>{

const bookshops={
    "name": "oasis de la lectura 6",
    "province": "Santo Domingo oeste",
    "city":"k9"
  
  };

const res=await requect(app).post("/api/v1/bookshops").send(bookshops);
console.log(res.body)
 expect(res.status).toBe(201);
 expect(res.body.bookshop.name).toBe(bookshops.name)
})