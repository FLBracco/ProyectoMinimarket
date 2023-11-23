import db from "../config/dbconfig.js";

//GET ALL
const getAllEmpleados = ('/empleados', async (req, res)=>{
    const [rows, _] = await db.execute('SELECT * FROM empleados');
    res.send(rows);
});

//Import de las librerias Express-validator
import { param, validationResult } from 'express-validator';
import { body, validationResult as checkValidationResult } from 'express-validator';


//GET x ID: Validacion:OK
const getEmpleadosById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const empleadosId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM empleados WHERE idEmpleados = :id', {id: empleadosId});
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({message: 'Empleado no encontrado'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Error en el servidor'})
        }
    }
];

//POST: Validacion: Ok
const createEmpleados = [
    body('nombre').isAlpha().notEmpty(),
    body('apellido').isAlpha().notEmpty(),
    body('direccion').notEmpty(),
    body('telefono').isInt().notEmpty(),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const nuevoEmpleado = req.body;
        try {
            const [rows, _] = await db.execute('INSERT INTO empleados (nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?)', [
                nuevoEmpleado.nombre,
                nuevoEmpleado.apellido,
                nuevoEmpleado.direccion,
                nuevoEmpleado.telefono
            ]);

            res.status(201).json({
                id: rows.insertId,
                ...nuevoEmpleado,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

//PUT: Validacion: Ok  
const updateEmpleados = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('nombre').isAlpha().notEmpty(),
    body('apellido').isAlpha().notEmpty(),
    body('direccion').notEmpty(),
    body('telefono').isInt().notEmpty(),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const empleadosId = req.params.id;
        const nuevoEmpleado = req.body;

        try {
            const [rows, _] = await db.execute('SELECT * FROM empleados WHERE idEmpleados = ?', [empleadosId]);

            if (empleadosId === undefined || rows.length === 0) {
                res.status(404).send({ message: 'Empleado no encontrado' });
                return;
            }

            await db.execute('UPDATE empleados SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE idEmpleados = ?', [
                nuevoEmpleado.nombre,
                nuevoEmpleado.apellido,
                nuevoEmpleado.direccion,
                nuevoEmpleado.telefono,
                empleadosId
            ]);
            res.send({ message: "Empleado actualizado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

//DELETE: Validacion: Ok
const deleteEmpleados = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const empleadosId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM empleados WHERE idEmpleados = ?', [empleadosId]);

            if (rows.length === 0) {
                res.status(404).send({ message: "Empleado no encontrado." });
            } else {
                await db.execute('DELETE FROM empleados WHERE idEmpleados = ?', [empleadosId]);
                res.send({ message: 'Empleado eliminado correctamente.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error del servidor" });
        }
    }
];

//Export
export {
    getAllEmpleados,
    getEmpleadosById,
    createEmpleados,
    updateEmpleados,
    deleteEmpleados
};