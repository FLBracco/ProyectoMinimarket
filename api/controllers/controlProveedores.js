import db from "../config/dbconfig.js"
//GET ALL
const getAllProveedores = ('/proveedores', async (req, res)=>{
    const [rows, _] = await db.execute('SELECT * FROM proveedores');
    res.send(rows);
});

//Import de las librerias Express-validator
import { param, validationResult } from 'express-validator';
import { body, validationResult as checkValidationResult } from 'express-validator';


//GET X ID : ok
const getProveedorById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const proveedorId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM proveedores WHERE idProveedor = ?', [proveedorId]);
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({ message: 'Proveedor no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    }
];


//POST: Ok
const createProveedor = [
    body('razonSocial').isAlpha().notEmpty(),
    body('provincia').notEmpty(),
    body('localidad').notEmpty(),
    body('domicilio').notEmpty(),
    body('cp').isInt({ min: 1000, max: 999999 }),
    body('telefono').isInt({ min: 1000000000, max: 9999999999 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const nuevoProveedor = req.body;

        try {
            const [rows, _] = await db.execute(
                'INSERT INTO proveedores (razonSocial, provincia, localidad, domicilio, cp, telefono) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    nuevoProveedor.razonSocial,
                    nuevoProveedor.provincia,
                    nuevoProveedor.localidad,
                    nuevoProveedor.domicilio,
                    nuevoProveedor.cp,
                    nuevoProveedor.telefono
                ]
            );

            res.status(201).json({
                id: rows.insertId,
                ...nuevoProveedor,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];


//PUT: error
const updateProveedor = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('razonSocial').isAlpha().notEmpty(),
    body('provincia').notEmpty(),
    body('localidad').notEmpty(),
    body('domicilio').notEmpty(),
    body('cp').isInt({ min: 1000, max: 999999 }),
    body('telefono').isInt({ min: 1000000000, max: 9999999999 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const proveedorId = req.params.id;
        const nuevoProveedor = req.body;

        try {
            const [rows, _] = await db.execute('SELECT * FROM proveedores WHERE idProveedor = ?', [proveedorId]);

            if (proveedorId === undefined || rows.length === 0) {
                res.status(404).send({ message: 'Proveedor no encontrado' });
                return;
            }

            await db.execute(
                'UPDATE proveedores SET razonSocial = ?, provincia = ?, localidad = ?, domicilio = ?, cp = ?, telefono = ? WHERE idProveedor = ?',
                [
                    nuevoProveedor.razonSocial,
                    nuevoProveedor.provincia,
                    nuevoProveedor.localidad,
                    nuevoProveedor.domicilio,
                    nuevoProveedor.cp,
                    nuevoProveedor.telefono,
                    proveedorId
                ]
            );
            res.send({ message: "Proveedor actualizado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];



//DELETE:
const deleteProveedor = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const proveedorId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM proveedores WHERE idProveedor = ?', [proveedorId]);

            if (rows.length === 0) {
                res.status(404).send({ message: "Proveedor no encontrado." });
            } else {
                await db.execute('DELETE FROM proveedores WHERE idProveedor = ?', [proveedorId]);
                res.send({ message: 'Proveedor eliminado correctamente.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error del servidor" });
        }
    }
];


export {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
}