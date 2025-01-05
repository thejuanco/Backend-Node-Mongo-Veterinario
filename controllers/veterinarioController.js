const registrar = (req, res) => {
    res.send('Ruta principal del veterinario')
}
const perfil = (req, res) => {
    res.send('Ruta principal del perfil')
}

export {
    registrar,
    perfil
}