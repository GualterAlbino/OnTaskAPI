// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import ProjetoHandler from '../../../adapters/http/projeto/ProjetoHandler'
import ProjetoService from '../../../application/projeto/ProjetoService'
import ProjetoController from '../../../adapters/http/projeto/ProjetoController'
import ProjetoPostgresRepository from '../../../adapters/postgres/projeto/ProjetoPostgresRepository'
import GrupoPostgresRepository from '../../../adapters/postgres/grupo/GrupoPostgresRepository'
import StatusPostgresRepository from '../../../adapters/postgres/status/StatusPostgresRepository'
import GrupoService from '../../../application/grupo/GrupoService'
import GrupoUsuarioPostgresRepository from '../../../adapters/postgres/grupo-usuario/GrupoUsuarioPostgresRepository'
import GrupoUsuarioService from '../../../application/grupo-usuario/GrupoUsuarioService'
import StatusService from '../../../application/status/StatusService'
import TipoStatusPostgresRepository from '../../../adapters/postgres/tipo-status/TipoStatusPostgresRepository'
import TipoStatusService from '../../../application/tipo-status/TipoStatusService'

const ProjetoRoutes = Router()

const projetoRepository = new ProjetoPostgresRepository()
const grupoRepository = new GrupoPostgresRepository()
const grupoUsuarioRepository = new GrupoUsuarioPostgresRepository()
const statusRepository = new StatusPostgresRepository()
const grupoUsuarioService = new GrupoUsuarioService(grupoUsuarioRepository)

const tipoStatusRepository = new TipoStatusPostgresRepository()
const tipoStatusService = new TipoStatusService(tipoStatusRepository)

const grupoService = new GrupoService(grupoRepository, grupoUsuarioService)
const statusService = new StatusService(statusRepository, tipoStatusService)

const projetoService = new ProjetoService(
  projetoRepository,
  grupoService,
  statusService
)

const projetoHandler = new ProjetoHandler(projetoService)
const projetoController = new ProjetoController(projetoHandler)

/**
 * @swagger
 * /projeto:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [Projeto]
 */
ProjetoRoutes.get('/', authMiddleware, (req, res, next) =>
  projetoController.buscar(req, res, next)
)

/**
 * @swagger
 * /projeto:
 *   post:
 *     summary: Cria um registro
 *     tags: [Projeto]
 */
ProjetoRoutes.post('/', authMiddleware, (req, res, next) =>
  projetoController.incluir(req, res, next)
)

/**
 * @swagger
 * /projeto/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [Projeto]
 */
ProjetoRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  projetoController.excluir(req, res, next)
)

/**
 * @swagger
 * /projeto/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [Projeto]
 */
ProjetoRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  projetoController.atualizar(req, res, next)
)

export default ProjetoRoutes
