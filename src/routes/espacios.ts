import express, { Request, Response, NextFunction } from "express";
import Espacio from "../schemas/espacio";
import { CreateEspacioRequest } from "../types/index";

const router = express.Router();

// Crear una nueva sede
router.post("/", async (req: Request<Record<string, never>, unknown, CreateEspacioRequest>, res: Response, next: NextFunction): Promise<void> => {
  console.log("createEspacio: ", req.body);
  const espacio = req.body;

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can create Espacios");
    return;
  }

  try {
    // Verificar si ya existe un espacio con ese nombre
    const existingEspacio = await Espacio.findOne({ nombre: espacio.nombre.toLowerCase() });
    if (existingEspacio) {
      res.status(400).send("A Espacio with that name already exists");
      return;
    }

    const newEspacio = new Espacio(espacio);
    await newEspacio.save();
    res.status(201).send(newEspacio);
  } catch (err) {
    next(err);
  }
});

// 🔄 Actualizar una sede por nombre (update parcial o total)
router.patch("/:nombre", async (req: Request<{ nombre: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { nombre } = req.params;
  const updates = req.body; // puede venir con uno o varios campos

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can update Espacios");
    return;
  }

  try {
    const updatedEspacio = await Espacio.findOneAndUpdate(
      { nombre: nombre.toLowerCase() },
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("sedes");

    if (!updatedEspacio) {
      res.status(404).send("Espacio not found");
      return;
    }

    res.send({ message: "Espacio updated successfully", updatedEspacio });
  } catch (err) {
    next(err);
  }
});

// Eliminar (desactivar) una sede por nombre
router.delete("/:nombre", async (req: Request<{ nombre: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { nombre } = req.params;

  if (!req.isAdmin?.()) {
    res.status(403).send("Only admins can delete Espacios");
    return;
  }

  try {
    const espacio = await Espacio.findOneAndUpdate(
      { nombre: nombre.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!espacio) {
      res.status(404).send("Espacio not found");
      return;
    }

    res.send({ message: "Espacio deactivated successfully", espacio });
  } catch (err) {
    next(err);
  }
});

export default router;