import mongoose, { Schema, Document } from "mongoose";
import { IEspacio } from '../types/index'

const { ObjectId } = Schema.Types

const espacioSchema = new Schema<IEspacio>(
  {
    nombre: { type: String, required: true, trim: true },
    precio: { type: Number },
    capacidad: { type: Number, required: true },
    descripcion: String,
    foto: String,
    sede: String,
    //sede: { type: ObjectId, ref: "Sede", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Espacio = mongoose.model<IEspacio>("Espacio", espacioSchema);
export default Espacio;