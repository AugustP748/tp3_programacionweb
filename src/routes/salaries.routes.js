const express = require('express');
const router = express.Router();
const DB = require('../db');

/**
 * Middleware para gestion de consultas empleado
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */

async function checkSalarios(req,res,next){
    const empl = await DB.Salaries.ObtenerListadoSalarios(req.params.id);
    //console.log(depto)
    if(empl == 0){        
        return res.status(404).send('Empleado no encontrado!!!')
    }
    // se guarda el objeto encontrado en la propiedad locals
    // para que pueda ser usado en los siguientes eslabones de la cadena
    res.locals.empl=empl;
    next();
}


// PUNTO 1: OBTENER LISTADO DE SALARIO DE UN EMPLEADO
// GET /api/v1/empleados/:id
router.get('/:id',checkSalarios,(req,res)=>{
    res.status(200).json(res.locals.empl);    
});


// PUNTO 2: CAMBIAR FECHA to_date Y NUEVO REGISTRO DE SALARIO
router.post('/',async (req,res)=>{
    const {emp_no,salary} =req.body    
    if(!emp_no){
        res.status(400).send('emp_no es Requerido!!!')
        return
    }
    if(!salary){
        res.status(400).send('salary es Requerido!!!')
        return
    }
    // Comprobamos existencia de empleado y validacion de salario
    const existEmpl = await DB.Employees.getById(emp_no)
    
    if(!existEmpl){
        res.status(404).send('El Empleado no existe!!!')
        return
    }
    
    if(typeof(salary) != 'number'){
        res.status(404).send('El salario no es valido!!!')
        return
    }
    const isUpdateOk = await DB.Salaries.ActualizarFechaToDate(req.body.emp_no)
    const isAddOk = await DB.Salaries.AgregarNuevoSalario(req.body)

    if(isUpdateOk && isAddOk){
        res.status(201).json(req.body)
    }else{
        res.status(500).send('Falló al agregar el nuevo salario!!!')
    }
});


module.exports=router