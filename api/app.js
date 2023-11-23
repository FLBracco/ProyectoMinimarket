import express from "express";
import cors from 'cors';
import rutasProductos from './routes/productos.js';
import rutasProveedores from './routes/proveedores.js';
import rutasDetalles from './routes/detalles.js';
import rutasEmpleados from './routes/empleados.js';
import rutasCompras from './routes/compras.js';
import rutasVentas from './routes/ventas.js';
import rutasLogin from './routes/auth.js';
import { autenticarToken } from './controllers/middleware.js'; // Importa el middleware

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(rutasLogin);

app.get("/", (req, res) => {
    res.send('La API esta en funcionamiento.');
});

// app.post('/login', rutasLogin);

// RUTAS PARA PRODUCTOS
app.get('/productos', autenticarToken, rutasProductos);
app.get('/productos/:id', autenticarToken,rutasProductos);
app.post('/productos', autenticarToken,rutasProductos);
app.put('/productos/:id', autenticarToken, rutasProductos);
app.delete('/productos/:id', autenticarToken,rutasProductos);

// RUTAS PARA PROVEEDORES
app.get('/proveedores', autenticarToken, rutasProveedores);
app.get('/proveedores/:id', autenticarToken, rutasProveedores);
app.post('/proveedores', autenticarToken,rutasProveedores);
app.put('/proveedores/:id', autenticarToken,rutasProveedores);
app.delete('/proveedores/:id', autenticarToken, rutasProveedores);

// RUTAS PARA DETALLE
app.get('/detalles', autenticarToken,rutasDetalles);
app.get('/detalles/:id', autenticarToken,rutasDetalles);
app.get('/detalles/:id/compras', autenticarToken, rutasDetalles);
app.post('/detalles', autenticarToken, rutasDetalles);
app.put('/detalles/:id', autenticarToken, rutasDetalles);
app.delete('/detalles/:id', autenticarToken, rutasDetalles);

// RUTAS PARA EMPLEADOS
app.get('/empleados', autenticarToken, rutasEmpleados);
app.get('/empleados/:id', autenticarToken, rutasEmpleados);
app.post('/empleados', autenticarToken, rutasEmpleados);
app.put('/empleados/:id', autenticarToken, rutasEmpleados);
app.delete('/empleados/:id', autenticarToken, rutasEmpleados);

// RUTAS PARA VENTAS
app.get('/ventas', autenticarToken, rutasVentas);
app.get('/ventas/:id', autenticarToken, rutasVentas);
app.post('/ventas', autenticarToken, rutasVentas);
app.put('/ventas/:id', autenticarToken, rutasVentas);
app.delete('/ventas/:id', autenticarToken, rutasVentas);

//RUTAS PARA COMPRAS
app.get('/compras', autenticarToken, rutasCompras);
app.get('/compras/:id', autenticarToken, rutasCompras);
app.post('/compras', autenticarToken, rutasCompras);
app.put('/compras/:id', autenticarToken, rutasCompras);
app.delete('/compras/:id', autenticarToken, rutasCompras);

// Rutas protegidas que requieren autenticación con token
app.get('/perfil', (req, res) => {
    res.json(req.user);
});

app.listen(3000, ()=> {
    console.log('La Base de dato esta funcionando en el puerto 3000');
});