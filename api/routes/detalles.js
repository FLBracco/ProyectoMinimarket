import express from 'express';
import {getAllDetalles, getDetallesById, createDetalles, updateDetalles, deleteDetalles, getDetallesByCompraId} from '../controllers/controlDetalles.js';

const router = express.Router();

// RUTAS CRUD PARA proveedores

router.get('/detalles', getAllDetalles);
router.get('/detalles/:id', getDetallesById);
router.get('/detalles/:id/compras', getDetallesByCompraId);
router.post('/detalles', createDetalles);
router.put('/detalles/:id', updateDetalles);
router.delete('/detalles/:id', deleteDetalles);

export default router;