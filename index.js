import express from 'express';
import conectarDB from './config/db.js';
import VeterinarioRouter from './routes/veterinario.routes.js'

const app = express();

conectarDB();

//Routing
app.use('/api/veterinarios', VeterinarioRouter)

//Definiendo el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando el puerto ${port}`)
})