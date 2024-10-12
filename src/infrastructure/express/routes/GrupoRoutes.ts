// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import GrupoHandler from '../../../adapters/http/grupo/GrupoHandler'
import GrupoService from '../../../application/grupo/GrupoService'
import GrupoController from '../../../adapters/http/grupo/GrupoController'
import GrupoPostgresRepository from '../../../adapters/postgres/grupo/GrupoPostgresRepository'
import GrupoUsuarioPostgresRepository from '../../../adapters/postgres/grupo-usuario/GrupoUsuarioPostgresRepository'
import GrupoUsuarioService from '../../../application/grupo-usuario/GrupoUsuarioService'
import UsuarioPostgresRepository from '../../../adapters/postgres/usuario/UsuarioPostgresRepository'
import UsuarioService from '../../../application/usuario/UsuarioService'

const GrupoRoutes = Router()

const grupoRepository = new GrupoPostgresRepository()
const grupoUsuarioRepository = new GrupoUsuarioPostgresRepository()


const grupoUsuarioService = new GrupoUsuarioService(grupoUsuarioRepository)
const grupoService = new GrupoService(
  grupoRepository,
  grupoUsuarioService

)

const grupoHandler = new GrupoHandler(grupoService)
const grupoController = new GrupoController(grupoHandler)

/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [Grupo]
 */
GrupoRoutes.get('/', authMiddleware, (req, res, next) =>
  grupoController.buscar(req, res, next)
)

/**
 * @swagger
 * /grupo:
 *   post:
 *     summary: Cria um registro
 *     tags: [Grupo]
 */
GrupoRoutes.post('/', authMiddleware, (req, res, next) =>
  grupoController.incluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [Grupo]
 */
GrupoRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  grupoController.excluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [Grupo]
 */
GrupoRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  grupoController.atualizar(req, res, next)
)

export default GrupoRoutes
