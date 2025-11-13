import express, { Request, Response, NextFunction } from "express";
import Sede from "../schemas/sede";
import Espacio from "../schemas/espacio";
import { CreateSedeRequest } from "../types/index";

const router = express.Router();

// Obtener todas las sedes activas
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sedes = await Sede.find({ isActive: true }).populate("espacios");
    res.send(sedes);
  } catch (err) {
    next(err);
  }
});

// Obtener una sede por nombre
router.get("/:nombre", async (req: Request<{ nombre: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sede = await Sede.findOne({ nombre: req.params.nombre.toLowerCase() }).populate("espacios");

    if (!sede) {
      res.status(404).send("Sede not found");
      return;
    }

    res.send(sede);
  } catch (err) {
    next(err);
  }
});

export default router;