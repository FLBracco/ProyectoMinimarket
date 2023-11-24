import { useNavigate } from 'react-router-dom';
import {Form, Button, Input} from "antd";
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (data) => {
        try {
            await login(data);    
            navigate('/productos');
        } catch (err) {
            console.log("Error: ", err);
        }
    }
    return (
        <div>
            <Form onFinish={handleSubmit} layout='vertical'>
                <Form.Item label="Usuario" name={"usuario"}>
                    <Input type="user" placeholder="user" />
                </Form.Item>
                <Form.Item label="Password" name={"password"}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button htmlType='submit'>Submit</Button>
            </Form>
        </div>
);
}

export default Login;