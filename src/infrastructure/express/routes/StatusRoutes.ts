// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import StatusHandler from '../../../adapters/http/status/StatusHandler'
import StatusService from '../../../application/status/StatusService'
import TipoStatusService from '../../../application/tipo-status/TipoStatusService'
import StatusController from '../../../adapters/http/status/StatusController'
import StatusPostgresRepository from '../../../adapters/postgres/status/StatusPostgresRepository'
import TipoStatusPostgresRepository from '../../../adapters/postgres/tipo-status/TipoStatusPostgresRepository'

const StatusRoutes = Router()

const tipoStatusRepository = new TipoStatusPostgresRepository()
const tipoStatusService = new TipoStatusService(tipoStatusRepository)

const statusRepository = new StatusPostgresRepository()
const statusService = new StatusService(statusRepository, tipoStatusService)
const statusHandler = new StatusHandler(statusService)
const statusController = new StatusController(statusHandler)

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [Status]
 */
StatusRoutes.get('/', authMiddleware, (req, res, next) =>
  statusController.buscar(req, res, next)
)

/**
 * @swagger
 * /status:
 *   post:
 *     summary: Cria um registro
 *     tags: [Status]
 */
StatusRoutes.post('/', authMiddleware, (req, res, next) =>
  statusController.incluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [Status]
 */
StatusRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  statusController.excluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [Status]
 */
StatusRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  statusController.atualizar(req, res, next)
)

export default StatusRoutes
