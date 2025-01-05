//Contiene las rutas del veterinario
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Ruta principal del veterinario')
})

export default router