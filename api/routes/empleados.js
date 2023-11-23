import express from 'express';
import {getAllEmpleados, getEmpleadosById, createEmpleados, updateEmpleados, deleteEmpleados} from '../controllers/controlEmpleados.js';

const router = express.Router();

// RUTAS CRUD PARA productos

router.get('/empleados', getAllEmpleados);
router.get('/empleados/:id', getEmpleadosById);
router.post('/empleados', createEmpleados);
router.put('/empleados/:id', updateEmpleados);
router.delete('/empleados/:id', deleteEmpleados);

export default router;