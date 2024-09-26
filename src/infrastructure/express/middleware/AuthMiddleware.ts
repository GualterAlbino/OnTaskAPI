import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../../../domain/base/BaseError'
import AuthService from '../../../application/security/AuthService'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.header('Authorization') || ''
  const token = header.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json(
        new UnauthorizedError(
          'AuthMiddleware',
          'O token não foi informado!',
          'Realize a autenticação para acessar o recurso.'
        )
      )
  }

  try {
    const sessaoDecodificada = AuthService.obterSessaoToken(token)
    req.sessao = sessaoDecodificada // Adiciona a sessão ao request
    next()
  } catch (error) {
    return res
      .status(401)
      .json(
        new UnauthorizedError(
          'AuthMiddleware',
          'Token inválido!',
          'O seu token é inválido ou expirou.'
        )
      )
  }
}
