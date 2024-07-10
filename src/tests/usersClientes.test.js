
const requect=require("supertest");
const {sequelize, users_clientes}=require("../models");
const app=require("../app");


beforeAll(async()=>{

    await sequelize.sync()

}, 1000000);

afterAll(async()=>{

    await sequelize.close()
});
  



test("POST/users_clientes", async()=>{

const user={
    name_cliente:"javier",
    last_name:"Nuñez",
    email: "javier1@gmail.com",
    password: "emma25",
    phone:"809-484-1714",
    province: "santo domingo este",
    city:"santo domingo ese"
}

const res=await requect(app).post("/api/v1/users_clientes").send(user)
expect(res.body.Users_cliente.name_cliente).toBe(user.name_cliente)
});

test("GET/users_clientes espero un estados 200", async()=>{

    const res=await requect(app).get("/api/v1/users_clientes");
    expect(res.status).toBe(200)
  
});


