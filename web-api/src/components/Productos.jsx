import React, { useState, useEffect } from 'react';
import { getAll, getProductosById, createProduct } from '../services/fetchProductos';
import { List, Button, Card, Input, Form, Modal } from 'antd';

const { Item } = Form;
const { confirm } = Modal;

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState(null);
    const [productId, setProductId] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const res = await getAll();
            setProductos(res);
        } catch (err) {
            console.error('Error al obtener Productos: ', err);
        }
    };

    const onClickProducto = async () => {
        if (productId.trim() !== '' && /^\d+$/.test(productId)) {
            try {
                const res = await getProductosById(productId);
                setBusqueda(res);
            } catch (err) {
                console.error('Error al obtener el producto por ID:', err);
            }
        } else {
            setBusqueda(null);
        }
    };

    const newProduct = async (values) => {
        const token = localStorage.getItem('token');
        console.log('Values: ', values);
        try {
            await createProduct(values, token);
            form.resetFields();
        } catch (err) {
            console.error('Error al agregar un nuevo producto:', err);
        }
    };

    const confirmacion = () => {
        console.log('formulario: ', form.getFieldsValue(true));
        confirm({
            title: 'Confirmar',
            content: '¿Seguro que quieres agregar un nuevo producto a la Base de Datos?',
            onOk: () => newProduct(form.getFieldsValue(['nombreProducto', 'categoria', 'descripcion', 'cantidad', 'precio'])),
            onCancel: () => {},
        });
    };

    return (
        <div>
            <Input
                placeholder="Ingrese el ID del producto"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />
            <Button type="primary" onClick={onClickProducto}>
                Search
            </Button>

            {busqueda && (
                <Card title={'Producto Seleccionado'}>
                    <p>ID: {busqueda.idProductos}</p>
                    <p>Nombre: {busqueda.nombreProducto}</p>
                    <p>Categoría: {busqueda.categoria}</p>
                    <p>Descripción: {busqueda.descripcion}</p>
                    <p>Cantidad: {busqueda.cantidad}</p>
                    <p>Precio: {busqueda.precio}</p>
                </Card>
            )}

            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={productos}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={'Productos'}>
                            <p>ID: {item.idProductos}</p>
                            <p>Nombre: {item.nombreProducto}</p>
                            <p>Categoría: {item.categoria}</p>
                            <p>Descripción: {item.descripcion}</p>
                            <p>Cantidad: {item.cantidad}</p>
                            <p>Precio: {item.precio}</p>
                            <Button onClick={() => onClickProducto(item.idProductos)}>Edit</Button>
                        </Card>
                    </List.Item>
                )}
            />

            <Form form={form} onFinish={newProduct} layout="vertical">
                <Item label="Nombre del Producto" rules={[{ required: true, message: 'Ingrese el nombre del producto' }]}>
                    <Input name="nombreProducto"/>
                </Item>
                <Item label="Categoría" rules={[{ required: true, message: 'Ingrese la categoría del producto' }]}>
                    <Input name="categoria"/>
                </Item>
                <Item label="Descripción" rules={[{ required: true, message: 'Ingrese la descripción del producto' }]}>
                    <Input name="descripcion"/>
                </Item>
                <Item label="Cantidad" rules={[{ required: true, message: 'Ingrese la cantidad del producto' }]}>
                    <Input type="number" name="cantidad"/>
                </Item>
                <Item label="Precio" rules={[{ required: true, message: 'Ingrese el precio del producto' }]}>
                    <Input type="number" name="precio"/>
                </Item>
                <Item>
                    <Button type="primary" onClick={confirmacion}>
                        Add Product
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default Productos;