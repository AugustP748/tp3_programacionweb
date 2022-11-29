const pool = require("./connection.db");
const TABLE='salaries'

// ============= PUNTO 1

/**
 * Retorna listado de salarios de un empleado
 * @returns 
 */
 module.exports.ObtenerListadoSalarios = async function (id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`SELECT * FROM ${TABLE} WHERE emp_no=?`,[id]);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };

  // ============= PUNTO 2

  /**
 * Modifica el campo to_date de tabla salario
 * @param {Object} empleado 
 * @returns 
 */
module.exports.ActualizarFechaToDate = async function (id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const SQL=`UPDATE ${TABLE} SET to_date=current_date() WHERE emp_no=? AND to_date='9999-01-01'`   
      const rows = await conn.query(SQL,[id]);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };


  /**
 * Agrega un nuevo salario
 * @param {Object} salario 
 * @returns 
 */
module.exports.AgregarNuevoSalario = async function (salario) {
    let conn;
    try {
      conn = await pool.getConnection();
      const SQL=`INSERT INTO ${TABLE} (emp_no,salary,from_date,to_date) VALUES (?,?,current_date(),'9999-01-01')`
      const params=[]
      params[0]=salario.emp_no
      params[1]=salario.salary
      const rows = await conn.query(SQL,params);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };

