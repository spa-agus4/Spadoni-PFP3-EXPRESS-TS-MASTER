import express, { Request, Response, NextFunction } from "express";
import Reserva from "../schemas/reservas";
import { CreateReservaRequest } from "../types/index";

const router = express.Router();

// Obtener todas las reservas activas
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  if (!req.isAdmin?.() || !req.isGerente?.()) {
    res.status(403).send("Only admins can create Sedes");
    return;
  }

  try {
    //const espacios = await Espacio.find({ isActive: true }).populate("sede");
    const reservas = await Reserva.find().populate("usuario").populate("espacio");
    res.send(reservas);
  } catch (err) {
    next(err);
  }
});

router.get("/usuario/:userID", async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const loggedUserId = req.user?._id?.toString();
  const requestedUserId = req.params.userID;

  // Solo puede ver reservas si es admin, gerente o dueño de la cuenta
  if (!req.isAdmin?.() && !req.isGerente?.() && loggedUserId !== requestedUserId) {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  try {
    const reservas = await Reserva.find({ usuario: requestedUserId })
      .populate("usuario")
      .populate({
        path: "espacio",
        populate:{ 
          path:"sede" }
      });

    if (!reservas.length) {
      res.status(404).send("El usuario no tiene reservas");
      return;
    }

    res.send(reservas);

  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { espacio, usuario, inicio, fin } = req.body;

    if (!espacio || !usuario || !inicio || !fin) {
      res.status(400).send("Faltan datos requeridos");
      return;
    }

    if (new Date(inicio) >= new Date(fin)) {
      res.status(400).send("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    // Validar solapamiento de reservas del mismo espacio
    const overlapping = await Reserva.findOne({
      espacio,
      $or: [
        { inicio: { $lt: fin }, fin: { $gt: inicio } }
      ]
    });

    if (overlapping) {
      res.status(400).send("El espacio ya está reservado en ese horario");
      return;
    }

    const reserva = new Reserva({
      espacio,
      usuario,
      inicio,
      fin,
      estado: "programada"
    });

    await reserva.save();
    res.status(201).send(reserva);

  } catch (err) {
    next(err);
  }
});

// cancelar reserva
router.put("/:id", async (req, res, next) => {
  try {
    const reservaId = req.params.id;

    const reserva = await Reserva.findById(reservaId)
      .populate("usuario")
      .populate({
        path: "espacio",
        populate: { path: "sede" }
      });

    if (!reserva) {
      res.status(404).send("Reserva no encontrada");
      return;
    }

    const loggedUserId = req.user?._id?.toString();

    // Permisos
    if (!req.isAdmin?.() && !req.isGerente?.() && reserva.usuario._id.toString() !== loggedUserId) {
      res.status(403).send("No tenés permiso para cancelar esta reserva");
      return;
    }

    // Validar estado
    if (reserva.estado !== "programada") {
      res.status(400).send("Solo se pueden cancelar reservas programadas");
      return;
    }

    reserva.estado = "cancelada";
    await reserva.save();

    res.send({ message: "Reserva cancelada correctamente", reserva });

  } catch (err) {
    next(err);
  }
});


export default router;