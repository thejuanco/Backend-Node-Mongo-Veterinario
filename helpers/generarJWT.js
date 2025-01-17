import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',  //Tiempo de expiración del token en horas
    })
}

export default generarJWT;