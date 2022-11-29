require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");
const fecha = require("../src/modelo/fecha");


describe("Rest API Salarios", () => {
    it("GET /api/v1/salarios/10010", async () => {
        const response = await request(app).get("/api/v1/salarios/10010");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        const emple = response.body;
        expect(emple).toBeDefined();
        expect(emple.length).toBeGreaterThan(1);
        expect(emple[0].emp_no).toBeDefined();
        expect(emple[0].emp_no).toBe(10010);
      });

      it("GET /api/v1/salarios/1", async () => {
        const response = await request(app).get("/api/v1/salarios/1");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("Empleado no encontrado!!!");
      });

      it("POST /api/v1/salarios  sin parámetros", async () => {
        const response = await request(app).post("/api/v1/salarios").send();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });


      it("POST /api/v1/salarios  sólo con emp_no", async () => {
        const empl = { emp_no: 10010 };
        const response = await request(app)
          .post("/api/v1/salarios")
          .send(empl);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("salary es Requerido!!!");
      });

      it("POST /api/v1/salarios  sólo con salary", async () => {
        const salario = { salary: 90377 };
        const response = await request(app)
          .post("/api/v1/salarios")
          .send(salario);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });


      it("Verificar que agrega con POST /api/v1/salarios", async () => {
        const salarie = { emp_no: 10010, salary: 90377, from_date: fecha,to_date: "9999-01-01T03:00:00.000Z"};
        const response = await request(app)
          .post("/api/v1/salarios")
          .send(salarie);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual(salarie);
    
        //verificar que se haya agregado el nuevo registro
        const responseGET = await request(app).get("/api/v1/salarios/10010");
        expect(responseGET).toBeDefined();
        expect(responseGET.statusCode).toBe(200);
        expect(responseGET.body[responseGET.body.length-1]).toStrictEqual(salarie);
    
        //Verificamos que se cambio la fecha especial por la actual en el antepenultimo registro
        // salarie.from_date = fecha actual 
        expect(responseGET.body[responseGET.body.length-2].to_date).toStrictEqual(salarie.from_date);


      });


})