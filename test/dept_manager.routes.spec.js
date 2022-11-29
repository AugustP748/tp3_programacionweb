require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");
const hoy = "2022-11-29T03:00:00.000Z" 

describe("Rest API deptmanager", () => {

it("POST /api/v1/deptmanager  sin parámetros", async () => {
        const response = await request(app).post("/api/v1/deptmanager").send();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });


      it("POST /api/v1/deptmanager  sólo con emp_no", async () => {
        const demp = { emp_no: 10010 };
        const response = await request(app)
          .post("/api/v1/deptmanager")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Departamento es Requerido!!!");
      });

      it("POST /api/v1/deptmanager  sólo con dept_no", async () => {
        const departamentoEmp = { dept_no: "d001" };
        const response = await request(app)
          .post("/api/v1/deptmanager")
          .send(departamentoEmp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("emp_no es Requerido!!!");
      });

      it("POST /api/v1/deptmanager  con departamento que no existe", async () => {
        const demp = { emp_no: 10010, dept_no: "fh009"};
        const response = await request(app)
          .post("/api/v1/deptmanager")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("El Departamento no existe!!!");
      });

      it("POST /api/v1/deptmanager  con empleado que no existe", async () => {
        const demp = { emp_no: 1, dept_no: "d001"};
        const response = await request(app)
          .post("/api/v1/deptmanager")
          .send(demp);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("El Empleado no existe!!!");
      });



      it("Verificar que agrega con POST /api/v1/deptmanager", async () => {
        const movimiento = { emp_no: 10010, dept_no: "d001",from_date: hoy,
         to_date: "9999-01-01T03:00:00.000Z"};
        const response = await request(app)
          .post("/api/v1/deptmanager")
          .send(movimiento);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual(movimiento);
    
        //verificar que se haya agregado el nuevo registro (nuevo jefe de departamento)
        const responseGET = await request(app).get("/api/v1/deptmanager/d001");
        expect(responseGET).toBeDefined();
        expect(responseGET.statusCode).toBe(200);
        expect(responseGET.body[responseGET.body.length-1]).toStrictEqual(movimiento);
    
        // verificar que el jefe de ahora es distinto al anterior
        expect(responseGET.body[responseGET.body.length-2].emp_no).not.toBe(movimiento.emp_no);
        expect(responseGET.body[responseGET.body.length-2].to_date).toStrictEqual(movimiento.from_date);


      });


})

