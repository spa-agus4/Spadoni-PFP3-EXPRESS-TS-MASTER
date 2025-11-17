import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { JWTPayload } from '../types/index'

// Middleware para extraer token
function getToken(req: Request, next: NextFunction): string | void {
  const TOKEN_REGEX = /^\s*Bearer\s+(\S+)/g
  const matches = TOKEN_REGEX.exec(req.headers.authorization || '')

  if (!matches) {
    next(new createError.Unauthorized())
    return
  }

  const [, token] = matches
  return token
}

function authentication(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers.authorization) {
    console.error('Missing authorization header')
    return next(new createError.Unauthorized())
  }

  const token = getToken(req, next)
  if (!token) return

  try {
    // Verificamos JWT
    const decoded = jwt.verify(token, 'base-api-express-generator', {
      issuer: 'base-api-express-generator',
    }) as JWTPayload

    if (!decoded || !decoded._id || !decoded.role) {
      console.error('Error authenticating malformed JWT')
      return next(new createError.Unauthorized())
    }

    // Guardamos el usuario en la request
    req.user = decoded

    // 🔹 Agregamos helpers de rol
    req.isAdmin = () => decoded.role === 'admin'
    req.isGerente = () => decoded.role === 'gerente'
    req.isCliente = () => decoded.role === 'cliente'
    //req.isUser

    console.info(`User ${decoded._id} authenticated as ${decoded.role}`)
    next()
  } catch (err) {
    const error = err as Error
    if (error.message === 'invalid algorithm' || error.message === 'invalid signature') {
      const ip =
        req.headers['x-forwarded-for'] ||
        (req as { connection?: { remoteAddress?: string } }).connection?.remoteAddress
      console.error(`Suspicious access attempt from ip=${ip} ${token}`)
    }
    if (error.name === 'TokenExpiredError') {
      console.error('Expired token, sending 401 to client')
      res.sendStatus(401)
      return
    }
    next(new createError.Unauthorized(error.message))
  }
}

export default authentication