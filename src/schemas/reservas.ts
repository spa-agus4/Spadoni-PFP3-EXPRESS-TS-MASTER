import mongoose, { Schema } from "mongoose";
import { IReserva, EstadoReserva } from "../types/index";

const { ObjectId } = Schema.Types;
const estadoReserva: EstadoReserva[] = ['programada', 'realizada', 'cancelada']

const reservaSchema = new Schema<IReserva>(
  {
      espacio: { type: ObjectId, ref: "Espacio", required: true },
      usuario: { type: ObjectId, ref: "User", required: true },
      inicio: { type: Date, required: true }, // contienen la fecha
      fin: { type: Date, required: true },
      estado: { type: String, enum: estadoReserva, default: 'programada' },
  },
  { timestamps: true }
);

const Reserva = mongoose.model<IReserva>("Reserva", reservaSchema);
export default Reserva;