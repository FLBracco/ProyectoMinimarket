import db from "../config/dbconfig.js";
import { body, param, validationResult} from 'express-validator'

const getAllDetalles = ('/detalles', async (req, res)=>{
    try {
        const [rows, _] = await db.execute('SELECT * FROM detalle');
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
});

const getDetallesById = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const detallesId = req.params.id;

        try {
            const [rows, _] = await db.execute('SELECT * FROM detalle WHERE idDetalle = ?', [detallesId]);
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(404).send({ message: 'Detalle no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    }
];

const createDetalles = [
    body('nuevoDetalles.cantidad').isInt({ min: 1, max: 100000 }),
    body('nuevoDetalles.precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('nuevoDetalles.productos_idProductos').isInt({ min: 1, max: 100000 }),
    body('nuevoDetalles.tipo').isIn(['venta', 'compra']),
    async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).send({ errors: validacion.errors });
            return;
        }
        const nuevoDetalles = req.body;

        try {
            const [rows, _] = await db.execute('INSERT INTO detalle (cantidad, precioTotal, productos_idProductos, tipo) VALUES (?, ?, ?, ?)',
                [
                    nuevoDetalles.cantidad,
                    nuevoDetalles.precioTotal, 
                    nuevoDetalles.productos_idProductos, 
                    nuevoDetalles.tipo
                ]);

            res.status(201).json({
                id: rows.insertId,
                ...nuevoDetalles,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

const updateDetalles = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    body('nuevoDetalles.cantidad').isInt({ min: 1, max: 100000 }),
    body('nuevoDetalles.precioTotal').isFloat({ min: 1, max: 100000000 }),
    body('nuevoDetalles.productos_idProductos').isInt({ min: 1, max: 100000 }),
    body('nuevoDetalles.tipo').isIn(['venta', 'compra']),
    async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            res.status(400).send({ errors: validacion.errors });
            return;
        }
        const detallesId = req.params.id;
        const nuevoDetalles = req.body;

        try {
            await db.execute('UPDATE detalle SET cantidad = ?, precioTotal = ?, productos_idProductos = ?, tipo = ? WHERE idDetalle = ?', [
                nuevoDetalles.cantidad,
                nuevoDetalles.precioTotal,
                nuevoDetalles.productos_idProductos,
                nuevoDetalles.tipo,
                detallesId
            ]);
            res.send({ message: "Detalle actualizado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor.' });
        }
    }
];

const deleteDetalles = [
    param('id').isInt({ min: 1, max: 2389489187 }).withMessage('El parámetro id debe ser un número entero entre 1 y 2389489187'),
    async (req, res) => {
        try {
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({ errores: errores.array() });
            }

            const detallesId = req.params.id;
            await db.execute('DELETE FROM detalle WHERE idDetalle = :id', { id: detallesId });
            res.send({ message: 'Detalle eliminado correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error del servidor' });
        }
    }
];

const getDetallesByCompraId = [
    param('id').isInt({min:1, max: 2344562342313}).withMessage('El parametro id debe ser un numero entero entre 1 y 2344562342313'),
    async (req, res) =>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()});
        }
        const compraId = req.params.id;
        
        try {
            const [rows, _] = await db.execute('SELECT * FROM detalle WHERE idCompra = ?', [compraId]);
            if(rows.length > 0){
                res.send(rows);
            }else{
                res.status(404).send({message: 'Detalles no encontrados para la compra especifica'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Error en el servidor'});
        }
    }
]

export {
    getAllDetalles,
    getDetallesById,
    createDetalles,
    updateDetalles,
    deleteDetalles,
    getDetallesByCompraId
}