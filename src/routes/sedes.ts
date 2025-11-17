import express, { Request, Response, NextFunction } from "express";
import Sede from "../schemas/sede";
import { CreateSedeRequest } from "../types/index";

const router = express.Router();

// Crear una nueva sede
router.post("/", async (req: Request<Record<string, never>, unknown, CreateSedeRequest>, res: Response, next: NextFunction): Promise<void> => {
  console.log("createSede: ", req.body);
  const sede = req.body;

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can create Sedes");
    return;
  }

  try {
    // Verificar si ya existe una sede con ese nombre
    const existingSede = await Sede.findOne({ nombre: sede.nombre.toLowerCase() });
    if (existingSede) {
      res.status(400).send("A Sede with that name already exists");
      return;
    }

    const newSede = new Sede(sede);
    await newSede.save();
    res.status(201).send(newSede);
  } catch (err) {
    next(err);
  }
});

// 🔄 Actualizar una sede por nombre (update parcial o total)
router.patch("/:nombre", async (req: Request<{ nombre: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { nombre } = req.params;
  const updates = req.body; // puede venir con uno o varios campos

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can update Sedes");
    return;
  }

  try {
    const updatedSede = await Sede.findOneAndUpdate(
      { nombre: nombre.toLowerCase() },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedSede) {
      res.status(404).send("Sede not found");
      return;
    }

    res.send({ message: "Sede updated successfully", updatedSede });
  } catch (err) {
    next(err);
  }
});

// Eliminar (desactivar) una sede por nombre
router.delete("/:nombre", async (req: Request<{ nombre: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { nombre } = req.params;

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can delete Sedes");
    return;
  }

  try {
    const sede = await Sede.findOneAndUpdate(
      { nombre: nombre.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!sede) {
      res.status(404).send("Sede not found");
      return;
    }

    res.send({ message: "Sede deactivated successfully", sede });
  } catch (err) {
    next(err);
  }
});

export default router;