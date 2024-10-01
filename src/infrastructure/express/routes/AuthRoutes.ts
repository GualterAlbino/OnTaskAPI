import { Router } from 'express'

import AuthService from '../../../application/security/AuthService'
import AuthHandler from '../../../adapters/http/security/AuthHandler'
import UsuarioService from '../../../application/usuario/UsuarioService'
import AuthController from '../../../adapters/http/security/AuthController'
import GrupoUsuarioService from '../../../application/grupo-usuario/GrupoUsuarioService'
import UsuarioPostgresRepository from '../../../adapters/postgres/usuario/UsuarioPostgresRepository'
import GrupoUsuarioPostgresRepository from '../../../adapters/postgres/grupo-usuario/GrupoUsuarioPostgresRepository'

const AuthRoutes = Router()

const usuarioRepository = new UsuarioPostgresRepository()
const grupoUsuarioRepository = new GrupoUsuarioPostgresRepository()

const grupoUsuarioService = new GrupoUsuarioService(grupoUsuarioRepository)
const usuarioService = new UsuarioService(usuarioRepository)

const authService = new AuthService(usuarioService, grupoUsuarioService)
const authHandler = new AuthHandler(authService)
const authController = new AuthController(authHandler)

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Realiza o login
 *     tags: [Auth]
 */
AuthRoutes.post('/login', (req, res, next) =>
  authController.login(req, res, next)
)

export default AuthRoutes
