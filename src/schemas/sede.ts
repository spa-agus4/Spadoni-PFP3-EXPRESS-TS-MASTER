import mongoose, { Schema, Document } from "mongoose";
import { ISede, IEspacio } from '../types/index'

const sedeSchema = new Schema<ISede>(
  {
    nombre: { type: String, required: true, unique: true, lowercase: true, trim: true },
    direccion: { type: String, required: true },
    foto: { type: String },
    phone: { type: String, trim: true },
    espacios: [{ type: Schema.Types.ObjectId, ref: "Espacio" }],
    horaApertura: { type: Date, required: true }, // Ej: 1970-01-01T08:00:00.000Z
    horaCierre: { type: Date, required: true },   // Ej: 1970-01-01T18:00:00.000Z
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Sede = mongoose.model<ISede>("Sede", sedeSchema);
export default Sede;