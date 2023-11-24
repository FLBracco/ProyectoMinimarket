import {createContext, useContext, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = async(data) =>{
        try {
            const res = await axios.post("http://localhost:3000/login", data ,{
                headers:{
                    'Content-Type': 'application/json'
                },
            });
            const token = res.data.token;
            localStorage.setItem("token", token)
            setAuthenticated(true);
            return token
        } catch (error) {
            console.error('Error al solicitar el token', error);
            throw error;
        }
    }
    const logout = ()=>{
        localStorage.removeItem("token");
        setAuthenticated(false)
    }  
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=> useContext(AuthContext)
