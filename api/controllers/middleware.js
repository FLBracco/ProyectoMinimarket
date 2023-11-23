import jwt from "jsonwebtoken";
import db from '../config/dbconfig.js';

export const autenticarToken = async (req, res, next) =>{
    const token = req.header('authorization');

    if(!token){
        return res.status(401).json({message: 'Token no proporcionado'});

    }

    try {
       const decodificado = jwt.verify(token, process.env.SECRET);
       const [rows, fields] = await db.execute('SELECT * FROM usuario WHERE usuario = ?', [decodificado.usuario]);

       if (rows.length > 0){
        req.user = rows[0];
        next();
       }else{
        res.status(401).json({message: 'Usuario no encontrado'});
       }
    } catch (error) {
        console.error(error);
        res.status(401).json({message: 'Token invalido'});
    }
}

