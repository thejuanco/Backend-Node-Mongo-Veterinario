import express from 'express';
import conectarDB from './config/db.js';

const app = express();

conectarDB();

//Routing
app.use('/', (req, res) => {
    res.send('API Restful - Home')
})

app.listen(4000, () => {
    console.log('servidor funcionando en el puerto 4000')
})