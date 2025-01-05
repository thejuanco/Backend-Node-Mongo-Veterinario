import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
    const {email} = req.body

    //Prevenir los usuario duplicados
    const existeUsuario = await Veterinario.find({email})

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

export {
    registrar,
    perfil
}