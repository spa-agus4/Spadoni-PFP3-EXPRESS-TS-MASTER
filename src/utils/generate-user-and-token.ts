import jwt from 'jsonwebtoken'
import Role from '../schemas/role'
import { IUser, JWTPayload } from '../types/index'

interface UserResponse {
  _id: string
  role: string
  email: string
  firstName: string
  lastName: string
}

interface TokenResponse {
  token: string
  user: UserResponse
}

async function generateUserToken(req: unknown, user: IUser): Promise<TokenResponse> {
  const role = await Role.findById(user.role).exec()
  if (!role) throw new Error('Role not found')

  const roleName = role.name.toLowerCase()

  const payload: JWTPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: roleName,
  }

  const userResponse: UserResponse = {
    _id: user._id.toString(),
    role: roleName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = jwt.sign(payload, 'base-api-express-generator', {
    subject: user._id.toString(),
    issuer: 'base-api-express-generator',
    expiresIn: '2h', // ⏰ expira en 2 horas
  })

  return { token, user: userResponse }
}

export default generateUserToken