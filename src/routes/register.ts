import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../schemas/user';
import Role from '../schemas/role';
import generateUserToken from '../utils/generate-user-and-token';
import { CreateUserRequest } from '../types/index';

const router = express.Router();

router.post('/', registerUser);

async function registerUser(
  req: Request<Record<string, never>, unknown, CreateUserRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    bornDate,
    governmentId,
  } = req.body;

  try {
    const role = await Role.findOne({ name: 'cliente' });
    if (!role) {
      res.status(500).json({ message: 'Client role not found' });
      return;
    }

    // Validaciones básicas
    if (!governmentId?.type || !governmentId?.number) {
      res.status(400).json({ message: 'governmentId.type and governmentId.number are required' });
      return;
    }

    // Evitar duplicados
    const existingUser = await User.findOne({
      $or: [{ email }, { 'governmentId.number': governmentId.number }],
    });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    // Encriptar contraseña
    const passEncrypted = await bcrypt.hash(password, 10);

    // Crear usuario
    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password: passEncrypted,
      phone,
      bornDate: bornDate ? new Date(bornDate) : undefined,
      governmentId,
      role: role._id,
      isActive: true,
    });

    // Generacion de token
    const { token, user } = await generateUserToken(req, userCreated);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
}

export default router;