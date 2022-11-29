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


async function checkDeptEmp(req,res,next){
    
    const deptEmp = await DB.Dept_emp.ObtenerHistDeptoEmp(req.params.id);
    //console.log(depto)
    if(deptEmp == 0){        
        return res.status(404).send('Empleado no encontrado!!!')
    }

    // se guarda el objeto encontrado en la propiedad locals
    // para que pueda ser usado en los siguientes eslabones de la cadena
    res.locals.deptEmp=deptEmp;
    next();
}




// GET /api/v1/dept_no/:id
router.get('/:id',checkDeptEmp,(req,res)=>{
    res.status(200).json(res.locals.deptEmp);    
});


// PUNTO 3: CAMBIAR FECHA to_DATE Y NUEVO REGISTRO DE SALARIO
router.post('/',async (req,res)=>{
    const {emp_no,dept_no} =req.body   
    console.log(dept_no) 
    if(!emp_no){
        res.status(400).send('emp_no es Requerido!!!')
        return
    }
    if(!dept_no){
        res.status(400).send('Departamento es Requerido!!!')
        return
    }
    const existDepto = await DB.Departmens.getById(dept_no)
    const existEmpl = await DB.Employees.getById(emp_no)
    if(!existDepto){
        res.status(404).send('El Departamento no existe!!!')
        return
    }
    if(!existEmpl){
        res.status(404).send('El Empleado no existe!!!')
        return
    }
    const ActualDept = await DB.Dept_emp.ObtenerDeptoActual(req.body)
    if(ActualDept){
        res.status(400).send('Departamento igual al actual!!!')
        return 
    }

    const isUpdateOk = await DB.Dept_emp.ActualizarFechaMov(req.body.emp_no)
    const isAddOk = await DB.Dept_emp.AgregarNewDeptEmp(req.body)

    if(isUpdateOk && isAddOk){
        res.status(201).json(req.body)
    }else{
        res.status(500).send('Falló el mover el empleado al nuevo departamento!!!')
    }
});


module.exports=router