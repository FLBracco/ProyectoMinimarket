import db from '../config/dbconfig.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const {usuario, password} = req.body;
    try {
        const user = await db.execute('SELECT * FROM usuario WHERE usuario = ? and password = ?', [usuario, password]);
        if(user.length > 0){
            const token = jwt.sign({usuario}, process.env.SECRET, {expiresIn: '1h'});
            res.json({token});
        }else{
            res.status(401).json({message: 'Creedenciales invalidas'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export { login };