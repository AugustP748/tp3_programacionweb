const express = require('express');
const router = express.Router();
const DB = require('../db');


/**
 * Middleware para verificar que existe el departamento con parámetro id
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */
 async function checkEmpleados(req,res,next){
    const empl = await DB.Employees.getById(req.params.id);
    //console.log(depto)
    if(!empl){        
        return res.status(404).send('Empleado no encontrado!!!')
    }
    // se guarda el objeto encontrado en la propiedad locals
    // para que pueda ser usado en los siguientes eslabones de la cadena
    res.locals.empl=empl;
    next();
}

// GET /api/v1/departamentos/:id
router.get('/:id',checkEmpleados,(req,res)=>{
    res.status(200).json(res.locals.empl);    
});


module.exports=router