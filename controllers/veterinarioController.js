import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    const {email} = req.body

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

        res.status(201).json(veterinarioGuardado)
    } catch (error) {
        console.error(error);
    }
}
const perfil = (req, res) => {
    res.send('Ruta principal del perfil')
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
        console.log('Usuario autenticado')
    } else {
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({message: error.message})
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}