import express, { Request, Response, NextFunction } from "express";
import Espacio from "../schemas/espacio";
import { CreateEspacioRequest } from "../types/index";

const router = express.Router();

// Obtener todas los espacios activas
router.get("/", async (req, res, next) => {
  try {
    const espacios = await Espacio.find({ isActive: true }).populate("sede");
    res.send(espacios);
  } catch (err) {
    next(err);
  }
});

// Obtener espacios filtrados por sede
router.get("/sede/:sedeId", async (req, res, next) => {
  try {
    const { sedeId } = req.params;

    const espacios = await Espacio.find({
      isActive: true,
      sede: sedeId
    }).populate("sede");

    if (!espacios || espacios.length === 0) {
      res.status(404).send("No hay espacios para esta sede.");
      return;
    }

    res.send(espacios);
  } catch (err) {
    next(err);
  }
});

// Obtener un espacio por ID  👈 PRIMERO ESTO
router.get("/id/:id", async (req, res, next) => {
  try {
    const espacio = await Espacio.findById(req.params.id).populate("sede");

    if (!espacio) {
      res.status(404).send("Espacio not found");
      return;
    }

    res.send(espacio);
  } catch (err) {
    next(err);
  }
});

// Obtener un espacio por nombre 👈 RUTA ESPECÍFICA
router.get("/nombre/:nombre", async (req, res, next) => {
  try {
    const espacio = await Espacio.findOne({ nombre: req.params.nombre.toLowerCase() }).populate("sede");
    
    if (!espacio) {
      res.status(404).send("Espacio not found");
      return;
    }

    res.send(espacio);
  } catch (err) {
    next(err);
  }
});

export default router;