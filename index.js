import express from 'express';

const app = express();

//Routing
app.use('/', (req, res) => {
    res.send('API Restful - Home')
})

app.listen(4000, () => {
    console.log('servidor funcionando en el puerto 4000')
})