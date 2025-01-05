import Veterinario from "../models/Veterinario.js"

const registrar = async (req, res) => {
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