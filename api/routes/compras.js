import express from 'express';
import { getAllCompras, getComprasById, createCompras, updateCompras, deleteCompras } from '../controllers/controlCompras.js';

const router = express.Router();

router.get('/compras', getAllCompras);
router.get('/compras/:id', getComprasById);
router.post('/compras', createCompras);
router.put('/compras/:id', updateCompras);
router.delete('/compras/:id', deleteCompras);

export default router;