import db from "../config/dbconfig.js";
//GET ALL
const getAllProductos = ('/productos', async (req, res)=>{
    const [rows, _] = await db.execute('SELECT * FROM productos');
    res.send(rows);
});

//Import de las librerias Express-validator
import { param, validationResult } from 'express-validator';
import { body, validationResult as checkValidationResult } from 'express-validator';


//GET x ID: Validacion:Ok
const getProductoById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const productoId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM productos WHERE idProductos = :id', { id: productoId });
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    }
];


//POST: Validacion: Ok 
const createProductos = [
    body('nombreProducto').isAlpha().notEmpty(),
    body('categoria').notEmpty(),
    body('descripcion').notEmpty(),
    body('cantidad').isInt({ min: 1, max: 100000 }),
    body('precio').isFloat({ min: 1, max: 100000000 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const nuevoProducto = req.body;
        try {
            const [rows, _] = await db.execute('INSERT INTO productos (nombreProducto, categoria, descripcion, cantidad, precio) VALUES (?, ?, ?, ?, ?)', [
                nuevoProducto.nombreProducto,
                nuevoProducto.categoria,
                nuevoProducto.descripcion,
                nuevoProducto.cantidad,
                nuevoProducto.precio
            ]);

            res.status(201).json({
                id: rows.insertId,
                ...nuevoProducto,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];


//PUT: Validacion:  Ok
const updateProductos = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('nombreProducto').isAlpha().notEmpty(),
    body('categoria').notEmpty(),
    body('descripcion').notEmpty(),
    body('cantidad').isInt({ min: 1, max: 100000 }),
    body('precio').isFloat({ min: 1, max: 100000000 }),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errors: validacion.errors });
            return;
        }

        const productoId = req.params.id;
        const nuevoProducto = req.body;

        try {
            const [rows, _] = await db.execute('SELECT * FROM productos WHERE idProductos = ?', [productoId]);

            if (productoId === undefined || rows.length === 0) {
                res.status(404).send({ message: 'Producto no encontrado' });
                return;
            }

            await db.execute('UPDATE productos SET nombreProducto = ?, categoria = ?, descripcion = ?, cantidad = ?, precio = ? WHERE idProductos = ?', [
                nuevoProducto.nombreProducto,
                nuevoProducto.categoria,
                nuevoProducto.descripcion,
                nuevoProducto.cantidad,
                nuevoProducto.precio,
                productoId
            ]);
            res.send({ message: "Producto actualizado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];



//DELETE: Validacion: Ok
const deleteProducto = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const validacion = checkValidationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).json({ errores: validacion.errors });
            return;
        }

        const productoId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM productos WHERE idProductos = ?', [productoId]);

            if (rows.length === 0) {
                res.status(404).send({ message: "Producto no encontrado." });
            } else {
                await db.execute('DELETE FROM productos WHERE idProductos = ?', [productoId]);
                res.send({ message: 'Producto eliminado correctamente.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error del servidor" });
        }
    }
];

//Export
export {
    getAllProductos,
    getProductoById,
    createProductos,
    updateProductos,
    deleteProducto
};

