import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <Header>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['productos']}>
        <Menu.Item key="productos">
          <Link to="/productos">Inicio</Link>
        </Menu.Item>
        <Menu.Item key="registrarCompra">
          <Link to="/registrar-compra">Registrar Compra</Link>
        </Menu.Item>
        <Menu.Item key="registrarVenta">
          <Link to="/registrar-venta">Registrar Venta</Link>
        </Menu.Item>
        <Menu.Item key="proveedores">
          <Link to="/proveedores">Proveedores</Link>
        </Menu.Item>
        <Menu.Item key="loginLogout" style={{float: 'right'}}>
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )};
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default NavBar;