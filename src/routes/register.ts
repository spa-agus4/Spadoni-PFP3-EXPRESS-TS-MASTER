import express, { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from '../schemas/user'
import Role from '../schemas/role'
import { CreateUserRequest } from '../types/index'

const router = express.Router()

router.post('/', registerUser)

async function registerUser(
  req: Request<Record<string, never>, unknown, CreateUserRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    bornDate,
    governmentId,
  } = req.body

  try {
    // Rol por defecto: cliente
    const role = await Role.findOne({ name: 'cliente' })
    if (!role) {
      res.status(500).send('Client role not found')
      return
    }

    // Validaciones básicas
    if (!governmentId || !governmentId.type || !governmentId.number) {
      res.status(400).json({ message: 'governmentId.type and governmentId.number are required' })
      return
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { 'governmentId.number': governmentId.number }],
    })
    if (existingUser) {
      res.status(409).send('User already exists')
      return
    }

    const passEncrypted = await bcrypt.hash(password, 10)

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
    })

    res.status(201).json({
      message: 'User registered successfully',
      userId: userCreated._id,
    })
  } catch (err) {
    next(err)
  }
}

export default router