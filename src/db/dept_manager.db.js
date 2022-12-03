const pool = require("./connection.db");
const TABLE='dept_manager'

// ============= PUNTO 4

/**
 * Retorna Historial de Jefes de un Departamento
 * @returns 
 */
 module.exports.ObtenerHistDeptoMan = async function (id_dept) {
    let conn;
    try {
      conn = await pool.getConnection();
      const SQL = `SELECT * FROM ${TABLE} WHERE dept_no=? order by to_date ASC`;
      const rows = await conn.query(SQL,[id_dept]);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      if (conn) await conn.release();
    }
  };


    /**
 * Retorna al jefe actual de un departamento
 * @returns 
 */
module.exports.ObtenerJefeActual = async function (dept_no) {
  let conn;
  try {
    conn = await pool.getConnection();
    const SQL= `select emp_no from ${TABLE} WHERE dept_no = ? AND to_date='9999-01-01'`;
    const rows = await conn.query(SQL,dept_no)
    return rows[0];
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};


    /**
 * Modifica fecha to_date de tabla dept_manager
 * @param {Object} dept_man 
 * @returns 
 */
     module.exports.ActualizarFechaMov = async function (id_dept) {
        let conn;
        try {
          conn = await pool.getConnection();
          const SQL=`UPDATE ${TABLE} SET to_date=current_date() WHERE dept_no=? AND to_date='9999-01-01'`      
          const rows = await conn.query(SQL,[id_dept]);
          return rows;
        } catch (err) {
          return Promise.reject(err);
        } finally {
          if (conn) await conn.release();
        }
      };
    
    
        /**
     * Agrega nuevo registro de nuevo jefe de departamento
     * @param {Object} dept_man 
     * @returns 
     */
    module.exports.AgregarNewJefeDept = async function (dept_man) {
        let conn;
        try {
          conn = await pool.getConnection();
          const SQL=`INSERT INTO ${TABLE} (emp_no,dept_no,from_date,to_date) VALUES (?,?,current_date(),'9999-01-01')`
          const params=[]
          params[0]=dept_man.emp_no
          params[1]=dept_man.dept_no
          const rows = await conn.query(SQL,params);
          return rows;
        } catch (err) {
          return Promise.reject(err);
        } finally {
          if (conn) await conn.release();
        }
      };