import express from 'express';
import conectarDB from './config/db.js';

const app = express();

conectarDB();

//Routing
app.use('/', (req, res) => {
    res.send('API Restful - Home')
})

//Definiendo el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando el puerto ${port}`)
})