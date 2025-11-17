import { Request, Response, NextFunction } from 'express'

// Extend Express Request interface
interface AuthenticatedRequest extends Request {
  isAdmin(): boolean
  isGerente(): boolean
  isCliente(): boolean
  isUser(): boolean
}

function authorization(req: Request, res: Response, next: NextFunction): void {
  const authReq = req as AuthenticatedRequest

  authReq.isAdmin = function isAdmin(): boolean {
    return !!(authReq.user && authReq.user.role === 'admin')
  }

  authReq.isGerente = function isGerente(): boolean {
    return !!(authReq.user && authReq.user.role === 'gerente')
  }

  authReq.isCliente = function isCliente(): boolean {
    return !!(authReq.user && authReq.user.role === 'cliente')
  }

  authReq.isUser = function isUser(): boolean {
    return !!(authReq.user)
  }

  return next()
}

export default authorization
