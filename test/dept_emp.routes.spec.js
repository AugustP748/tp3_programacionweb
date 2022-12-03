require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");
const fecha = require("../src/modelo/fecha");

describe("Rest API dept_emp", () => {

it("POST /api/v1/deptemp  sin parámetros", async () => {
        const response = await request(app).post("/api/v1/deptemp").send();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });


      it("POST /api/v1/deptemp  sólo con emp_no", async () => {
        const demp = { emp_no: 10010 };
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Departamento es Requerido!!!");
      });

      it("POST /api/v1/deptemp  sólo con dept_emp", async () => {
        const departamentoEmp = { dept_no: "d001" };
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(departamentoEmp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });


      it("POST /api/v1/deptemp  con departamento que no existe", async () => {
        const demp = { emp_no: 10010, dept_no: "fh009"};
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("El Departamento no existe!!!");
      });

      it("POST /api/v1/deptemp  con empleado que no existe", async () => {
        const demp = { emp_no: 1, dept_no: "d001"};
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("El Empleado no existe!!!");
      });

      it("POST /api/v1/deptemp  con departamento igual al actual", async () => {
        const demp = { emp_no: 10010, dept_no: "d006"};
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Departamento igual al actual!!!");
      });


      it("Verificar que agrega con POST /api/v1/deptemp", async () => {
        const movimiento = { emp_no: 10010, dept_no: "d001",from_date: fecha,
         to_date: "9999-01-01T03:00:00.000Z"};
        const response = await request(app)
          .post("/api/v1/deptemp")
          .send(movimiento);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual(movimiento);
    
        //verificar que se haya agregado el nuevo registro (empleado a nuevo departamento)
        const responseGET = await request(app).get("/api/v1/deptemp/10010");
        expect(responseGET).toBeDefined();
        expect(responseGET.statusCode).toBe(200);
        expect(responseGET.body[responseGET.body.length-1]).toStrictEqual(movimiento);
        expect(responseGET.body[responseGET.body.length-1].to_date).toStrictEqual(movimiento.to_date);
        expect(responseGET.body[responseGET.body.length-1].from_date).toStrictEqual(movimiento.from_date);
        expect(responseGET.body[responseGET.body.length-1].emp_no).toStrictEqual(movimiento.emp_no);
    
        //Verificamos que se cambio la fecha especial por la actual en el antepenultimo registro
        // salarie.from_date = fecha actual 
        expect(responseGET.body[responseGET.body.length-2].to_date).toStrictEqual(movimiento.from_date);


      });


})

