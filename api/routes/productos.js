import express from 'express';
import {getAllProductos, getProductoById, createProductos, updateProductos, deleteProducto} from '../controllers/controlProductos.js';

const router = express.Router();

// RUTAS CRUD PARA productos

router.get('/productos', getAllProductos);
router.get('/productos/:id', getProductoById);
router.post('/productos', createProductos);
router.put('/productos/:id', updateProductos);
router.delete('/productos/:id', deleteProducto);

export default router;