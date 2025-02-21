import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/generarJWT.js"
import { generarId } from "../helpers/generarId.js"
import emailRegistro from "../helpers/emailRegistro.js"
import emailForgotPassword from "../helpers/emailOlvidePassword.js"

const registrar = async (req, res) => {
    const { email, nombre } = req.body

    //Prevenir los usuario duplicados
    const existeUsuario = await Veterinario.findOne({email})

    if(existeUsuario){
        const error = new Error("El usuario ya existe")
        return res.status(400).json({msg: error.message})
    }

    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()

        //Enviar el correo
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.status(201).json(veterinarioGuardado)
    } catch (error) {
        console.error(error);
    }
}
const perfil = (req, res) => {
    const { veterinario } = req;
    res.json(veterinario);
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ token })

    if(!usuarioConfirmar){
        const error = new Error("Token inválido")
        return res.status(400).json({msg: error.message})
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()
        
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email})

    if(!usuario){
        const error = new Error(`El usuario no existe`)
        return res.status(403).json({message: error.message})
    }
    
    //Comprobar si el usuario no esta confirmado
    if(!usuario.confirmado){
        const error = new Error(`Tu cuenta no esta confirmada`)
        return res.status(403).json({message: error.message})
    }

    //Autenticar al usuario
    if(usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token:  generarJWT(usuario.id)
        });
    } else {
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({message: error.message})
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const existeVeterinario = await Veterinario.findOne({email})
    
    if(!existeVeterinario){
        const error = new Error("El usuario no existe")
        return res.status(400).json({msg: error.message})
    }

    try{
        existeVeterinario.token = generarId();
        await existeVeterinario.save()

        //Enviar el correo con instrucciones
        emailForgotPassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })

        res.json({msg: "Hemos enviado un correo con las intrucciones"})
    } catch(error){
        console.log(error)
    }
}
const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Veterinario.findOne({token})
    
    if(tokenValido){
        res.json({msg: "Token válido y el usuario existe"})
    }else{
        const error = new Error("Token inválido")
        return res.status(400).json({msg: error.message})
    }
}
const nuevoPassword = async (req, res) => {
    const {token} = req.params
    const {password} = req.body

    const veterinario = await Veterinario.findOne({token})

    if(!veterinario){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }

    try {
        veterinario.token = null
        veterinario.password = password
        await veterinario.save()
        res.json({msg: "Contraseña actualizada correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const actualizarPefil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if(!veterinario)
    {
        return res.status(404).json({msg: "No se encontró el veterinario"});
    }

    try {
        veterinario.nombre = req.body.nombre || veterinario.nombre;
        veterinario.email = req.body.email || veterinario.email;
        veterinario.web = req.body.web || veterinario.web;
        veterinario.telefono = req.body.telefono || veterinario.telefono;

        const veterinairoActualizado = await veterinario.save();
        res.json(veterinairoActualizado)
    } catch (error) {
        console.log(error)
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPefil
}