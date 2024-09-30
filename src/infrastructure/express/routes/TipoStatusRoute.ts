// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import TipoStatusHandler from '../../../adapters/http/tipo-status/TipoStatusHandler'
import TipoStatusService from '../../../application/tipo-status/TipoStatusService'
import TipoStatusController from '../../../adapters/http/tipo-status/TipoStatusController'
import TipoStatusPostgresRepository from '../../../adapters/postgres/tipo-status/TipoStatusPostgresRepository'

const TipoStatusRoutes = Router()

const tipoStatusRepository = new TipoStatusPostgresRepository()
const tipoStatusService = new TipoStatusService(tipoStatusRepository)
const tipoStatusHandler = new TipoStatusHandler(tipoStatusService)
const tipoStatusController = new TipoStatusController(tipoStatusHandler)

/**
 * @swagger
 * /tipoStatus:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [TipoStatus]
 */
TipoStatusRoutes.get('/', authMiddleware, (req, res, next) =>
  tipoStatusController.buscar(req, res, next)
)

/**
 * @swagger
 * /tipoStatus:
 *   post:
 *     summary: Cria um registro
 *     tags: [TipoStatus]
 */
TipoStatusRoutes.post('/', authMiddleware, (req, res, next) =>
  tipoStatusController.incluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [TipoStatus]
 */
TipoStatusRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  tipoStatusController.excluir(req, res, next)
)

/**
 * @swagger
 * /tipoStatus/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [TipoStatus]
 */
TipoStatusRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  tipoStatusController.atualizar(req, res, next)
)

export default TipoStatusRoutes
