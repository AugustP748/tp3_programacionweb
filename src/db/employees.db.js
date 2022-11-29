const pool = require("./connection.db");
const TABLE='employees'

/**
 * Retorna un departamento por su clave primaria
 * @returns 
 */
 module.exports.getById = async function (id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`SELECT * FROM ${TABLE} WHERE emp_no=?`,[id]);
      return rows[0];
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };