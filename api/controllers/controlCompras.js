import db from "../config/dbconfig.js";

//GET General
const getAllCompras = async (req, res) => {
    const [rows, _] = await db.execute('SELECT * FROM compra');
    res.send(rows)
};


//Import de las librerias Express-validator
import { param, validationResult } from 'express-validator';
import { body, validationResult as checkValidationResult } from 'express-validator';

//GET: Validacion: OK
const getComprasById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const comprasId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM compra WHERE idOrden = ?', [comprasId]);
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({ message: 'Compra no encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    }
];


//POST: Validacion: OK
const createCompras = [
    body('precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('descripcion').notEmpty(),
    body('empleados_idEmpleados').isInt({ min: 1, max: 100000 }),
    body('proveedores_idProveedor').isInt({ min: 1, max: 100000 }),
    body('detalle_idDetalle').isInt({ min: 1, max: 100000 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const nuevaCompra = req.body;
        try {
            const [rows, _] = await db.execute(
                'INSERT INTO compra (precioTotal, fecha_y_hora, descripcion, empleados_idEmpleados, proveedores_idProveedor, detalle_idDetalle) VALUES (?, NOW(), ?, ?, ?, ?)', 
                [
                    nuevaCompra.precioTotal,
                    nuevaCompra.descripcion,
                    nuevaCompra.empleados_idEmpleados,
                    nuevaCompra.proveedores_idProveedor,
                    nuevaCompra.detalle_idDetalle
                ]);

            res.status(201).json({
                id: rows.insertId,
                ...nuevaCompra,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

//PUT: Validacion: OK
const updateCompras = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('descripcion').notEmpty(),
    body('empleados_idEmpleados').isInt({ min: 1, max: 100000 }),
    body('proveedores_idProveedor').isInt({ min: 1, max: 100000 }),
    body('detalle_idDetalle').isInt({ min: 1, max: 100000 }),
    async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const comprasId = req.params.id;
        const nuevaCompra = req.body;

        try {
            await db.execute(
                'UPDATE compra SET precioTotal = ?, fecha_y_hora = NOW(), descripcion = ?,empleados_idEmpleados = ?, proveedores_idProveedor = ?, detalle_idDetalle = ? WHERE idOrden = ?', 
                [ 
                    nuevaCompra.precioTotal,
                    nuevaCompra.descripcion,
                    nuevaCompra.empleados_idEmpleados,
                    nuevaCompra.proveedores_idProveedor,
                    nuevaCompra.detalle_idDetalle,
                    comprasId
                ]);
            res.send({ message: "Compra actualizada correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

//DELETE: Validacion: OK
const deleteCompras = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        try {
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({ errores: errores.array() });
            }

            const comprasId = req.params.id;
            await db.execute('DELETE FROM compra WHERE idOrden = ?', [comprasId]);
            res.send({ message: 'Compra eliminado correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error del servidor' });
        }
    }
];

//Export
export {
    getAllCompras,
    getComprasById,
    createCompras,
    updateCompras,
    deleteCompras
};