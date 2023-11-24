import axios from "axios";

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const token = response.data.token;
        return token;
    } catch (error) {
        console.error('Error al solicitar el token', error);
        throw error;
    };
};