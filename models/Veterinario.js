import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

//Hashear la contraseña actual
veterinarioSchema.pre('save', async function(next) {
    if(!this.isModified("password")) {
        next();
    }; //next 

    //Modificar la contraseña antes de que se almacene
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;