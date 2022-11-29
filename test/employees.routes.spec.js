require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

describe("Rest API Empleados", () => {

    it("GET /api/v1/empleados/10010", async () => {
        const response = await request(app).get("/api/v1/empleados/10010");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        const empl = response.body;
        expect(empl).toBeDefined();
        expect(empl.emp_no).toBeDefined();
        expect(empl.emp_no).toBe(10010);
      });

      it("GET /api/v1/empleados/1", async () => {
        const response = await request(app).get("/api/v1/empleados/1");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("Empleado no encontrado!!!");
      });



})