import db from "../config/dbconfig.js";

const getAllVentas = ('/ventas',async (req, res) => {
    const [rows, _] = await db.execute('SELECT * FROM venta');
    res.send(rows)
});

//Import de las librerias Express-validator
import { param, validationResult } from 'express-validator';
import { body, validationResult as checkValidationResult } from 'express-validator';


//GET x ID: Validacion:
const getVentaById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const ventasId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM venta WHERE idFactura = ?', [ventasId]);
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    }
];



//POST: Validacion: 
const createVenta = [
    body('precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('empleados_idEmpleados').isInt({ min: 1, max: 100000 }),
    body('detalle_idDetalle').isInt({ min: 1, max: 100000 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const nuevaVenta = req.body;
        try {
            const [rows, _] = await db.execute(
                'INSERT INTO venta (fecha_y_hora, precioTotal, empleados_idEmpleados, detalle_idDetalle) VALUES (NOW(), ?, ?, ?)', 
                [
                    nuevaVenta.precioTotal, 
                    nuevaVenta.empleados_idEmpleados,
                    nuevaVenta.detalle_idDetalle
                ]);

            res.status(201).json({
                id: rows.insertId,
                ...nuevaVenta,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

//PUT: Validacion:ERROR 
const updateVenta = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('empleados_idEmpleados').isInt({ min: 1, max: 100000 }),
    body('detalle_idDetalle').isInt({ min: 1, max: 100000 }),
    async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const ventasId = req.params.id;
        const nuevaVenta = req.body;

        try {
            await db.execute(
                'UPDATE venta SET fecha_y_hora = NOW(), precioTotal = ?, empleados_idEmpleados = ?, detalle_idDetalle = ? WHERE idFactura = ?', 
                [ 
                    nuevaVenta.precioTotal, 
                    nuevaVenta.empleados_idEmpleados,
                    nuevaVenta.detalle_idDetalle,
                    ventasId
                ]);
            res.send({ message: "Venta actualizada correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Error del servidor.'});
        }
    }
];



//Delete: Validacion: Ok
const deleteVenta = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const ventasId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM venta WHERE idFactura = ?', [ventasId]);

            if (rows.length === 0) {
                res.status(404).send({ message: "Venta no encontrada." });
            } else {
                await db.execute('DELETE FROM venta WHERE idFactura = ?', [ventasId]);
                res.send({ message: 'Venta eliminada correctamente.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error del servidor" });
        }
    }
];


//Export
export {
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
};