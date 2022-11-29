const pool = require("./connection.db");
const TABLE='dept_emp'


// ============= PUNTO 3

/**
 * Retorna Historial de Departamentos de un empleado
 * @returns 
 */
 module.exports.ObtenerHistDeptoEmp = async function (id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const SQL = `SELECT * FROM ${TABLE} WHERE emp_no=?  order by to_date ASC`;
      const rows = await conn.query(SQL,[id]);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };



  /**
 * Modifica fecha to_date de tabla dept_emp
 * @param {Object} dept_emp 
 * @returns 
 */
   module.exports.ActualizarFechaMov = async function (id) {
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
 * Agrega nuevo registro de empleado en nuevo departamento
 * @param {Object} depto_emp 
 * @returns 
 */
module.exports.AgregarNewDeptEmp = async function (depto_emp) {
    let conn;
    try {
      conn = await pool.getConnection();
      const SQL=`INSERT INTO ${TABLE} (emp_no,dept_no,from_date,to_date) VALUES (?,?,current_date(),'9999-01-01')`
      const params=[]
      params[0]=depto_emp.emp_no
      params[1]=depto_emp.dept_no
      const rows = await conn.query(SQL,params);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };

  /**
 * Retorna departamento actual de un empleado
 * @param {Object} depto_emp 
 * @returns 
 */
module.exports.ObtenerDeptoActual = async function (depto_emp) {
  let conn;
  try {
    conn = await pool.getConnection();
    const SQL= `SELECT * FROM ${TABLE} WHERE dept_no = ? and emp_no = ? and to_date='9999-01-01'`;
    const params=[]
    params[0]=depto_emp.dept_no
    params[1]=depto_emp.emp_no
    const rows = await conn.query(SQL,params)
    return rows[0];
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};