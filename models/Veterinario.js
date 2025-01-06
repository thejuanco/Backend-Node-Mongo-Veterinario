import mongoose from "mongoose";
import { generarId } from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true, //Elimina los espacios en blanco
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //Elimina los espacios en blanco
        //match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //Expresión regular para validar el email
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    sitioWeb: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
})

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;