import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: '.env'})

const conectarDB = async () => {
    try {
        //Establecer conexion con la base de datos
        const db = await mongoose.connect(process.env.DATABASE_MONGO)
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`Conectado a la base de datos en ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;