import express, { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import User from '../schemas/user'
import Role from '../schemas/role'
import { CreateUserRequest } from '../types/index'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

function toDate(input: string): Date {
  const parts = input.split('/')
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected DD/MM/YYYY')
  }
  const [day, month, year] = parts
  if (!day || !month || !year) {
    throw new Error('Invalid date format. Expected DD/MM/YYYY')
  }
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

// Solo Admin o Gerente pueden ver todos los usuarios
async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.isAdmin?.() && !req.isGerente?.()) {
    res.status(403).send('Forbidden: only Admin or Gerente can view users')
    return
  }

  try {
    const users = await User.find({ isActive: true }).populate('role')
    res.send(users)
  } catch (err) {
    next(err)
  }
}


// Obtener usuario por ID (Admin, Gerente o el propio usuario)
async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('getUser with id: ', req.params.id)

  if (!req.params.id) {
    res.status(500).send('The param id is not defined')
    return
  }

  if (!req.isAdmin?.() && !req.isGerente?.() && req.user?._id !== req.params.id) {
    res.status(403).json({ message: 'Access denied' });
    return 
  }

  try {
    const user = await User.findById(req.params.id).populate('role')

    if (!user) {
      res.status(404).send('User not found')
      return
    }

    res.send(user)
  } catch (err) {
    next(err)
  }
}

async function createUser(
  req: Request<Record<string, never>, unknown, CreateUserRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('createUser: ', req.body);

  const user = req.body;

  try {
    const role = await Role.findOne({ name: user.role });
    if (!role) {
      res.status(404).send('Role not found');
      return;
    }

    // solo admin puede crear roles que no sean cliente
    if (!req.isAdmin?.() && role.name !== 'cliente') {
      res.status(403).send('Only admins can assign this role');
      return;
    }

    const passEncrypted = await bcrypt.hash(user.password, 10);

    const userCreated = await User.create({
      ...user,
      bornDate: user.bornDate ? toDate(user.bornDate.toString()) : undefined,
      password: passEncrypted,
      role: role._id,
    });

    res.send(userCreated);
  } catch (err) {
    next(err);
  }
}


async function updateUser(
  req: Request<{ id: string }, unknown, Partial<CreateUserRequest>>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('updateUser with id: ', req.params.id)

  if (!req.params.id) {
    res.status(404).send('Parameter id not found')
    return
  }

  try {
    const userToUpdate = await User.findById(req.params.id).populate('role')
    if (!userToUpdate) {
      console.error('User not found')
      res.status(404).send('User not found')
      return
    }

    const targetRole = (userToUpdate.role as any)?.name

    // - Admin puede editar todos los usuarios
    // - Gerente puede editar a Clientes solo
    // - Cliente solo puede editar su perfil
    if (req.isAdmin?.()) {
    } else if (req.isGerente?.()) {
      if (targetRole === 'admin') {
        res.status(403).send('Unauthorized: cannot edit an admin');
        return 
      }
    } else if (req.user?._id === req.params.id) {
    } else {
      res.status(403).send('Unauthorized');
      return 
    }

    delete req.body.email

    if (req.body.role) {
      const newRole = await Role.findById(req.body.role)
      if (!newRole) {
        console.info('New role not found. Sending 400 to client')
        res.status(400).end()
        return
      }
      req.body.role = newRole._id.toString()
    }

    if (req.body.password) {
      const passEncrypted = await bcrypt.hash(req.body.password, 10)
      req.body.password = passEncrypted
    }

    await userToUpdate.updateOne(req.body)
    res.send(userToUpdate)

    // This return the current status
    // userToUpdate.password = req.body.password
    // userToUpdate.role = req.body.role
    // userToUpdate.firstName = req.body.firstName
    // userToUpdate.lastName = req.body.lastName
    // userToUpdate.phone = req.body.phone
    // userToUpdate.bornDate = req.body.bornDate
    // userToUpdate.isActive = req.body.isActive
    // await userToUpdate.save()
    // res.send(userToUpdate)
  } catch (err) {
    next(err)
  }
}

 
async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('deleteUser with id: ', req.params.id)

  if (!req.params.id) {
    res.status(500).send('The param id is not defined')
    return
  }

  try {
    const userToDelete = await User.findById(req.params.id).populate('role')
    if (!userToDelete) {
      res.status(404).send('User not found')
      return
    }

    const targetRole = (userToDelete.role as any)?.name

    // misma logica de roles que en editar, pero para eliminar
    if (req.isAdmin?.()) {
      // ok
    } else if (req.isGerente?.()) {
      if (targetRole === 'admin' || targetRole === 'gerente') {
        res.status(403).send('Unauthorized: cannot delete admin or other gerente')
        return 
      }
    } else if (req.user?._id === req.params.id) { // (req.user?._id?.toString() === req.params.id)
        await User.deleteOne({ _id: userToDelete._id })
        res.send({ message: 'Cuenta eliminada exitosamente' })
        return
    } else {
      res.status(403).send('Unauthorized')
      return 
    }

    await User.deleteOne({ _id: userToDelete._id })
    res.send(`User deleted: ${req.params.id}`)

  } catch (err) {
    next(err)
  }
}


export default router