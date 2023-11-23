import express from 'express';
import {getAllProveedores, getProveedorById, createProveedor, updateProveedor, deleteProveedor} from '../controllers/controlProveedores.js';

const router = express.Router();

// RUTAS CRUD PARA proveedores

router.get('/proveedores', getAllProveedores);
router.get('/proveedores/:id', getProveedorById);
router.post('/proveedores', createProveedor);
router.put('/proveedores/:id', updateProveedor);
router.delete('/proveedores/:id', deleteProveedor);

export default router;
