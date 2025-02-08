import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js';
import VeterinarioRouter from './routes/veterinario.routes.js'
import PacienteRouter from './routes/paciente.routes.js'

const app = express();

//Establece la conexion con la base de datos
conectarDB();

//Dominios permitidos
const dominiosPermitidos = [
    'http://localhost:5173',
    'http://localhost:4000'
]

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request permitido
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}

app.use(cors(corsOptions))

//Habilitar la lectura de formulario
app.use(express.json());

//Routing
app.use('/api/veterinarios', VeterinarioRouter)
app.use('/api/pacientes', PacienteRouter)

//Definiendo el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando el puerto ${port}`)
})