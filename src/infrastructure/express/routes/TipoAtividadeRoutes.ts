// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'
import TipoAtividadeHandler from '../../../adapters/http/tipo-atividade/TipoAtividadeHandler'
import TipoAtividadeService from '../../../application/tipo-atividade/TipoAtividadeService'
import TipoAtividadeController from '../../../adapters/http/tipo-atividade/TipoAtividadeController'
import TipoAtividadePostgresRepository from '../../../adapters/postgres/tipo-atividade/TipoAtividadePostgresRepository'

const TipoAtividadeRoutes = Router()

const tipoAtividadeRepository = new TipoAtividadePostgresRepository()
const tipoAtividadeService = new TipoAtividadeService(tipoAtividadeRepository)
const tipoAtividadeHandler = new TipoAtividadeHandler(tipoAtividadeService)
const tipoAtividadeController = new TipoAtividadeController(
  tipoAtividadeHandler
)

/**
 * @swagger
 * /tipoAtividade:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [TipoAtividade]
 */
TipoAtividadeRoutes.get('/', authMiddleware, (req, res, next) =>
  tipoAtividadeController.buscar(req, res, next)
)

/**
 * @swagger
 * /tipoAtividade:
 *   post:
 *     summary: Cria um registro
 *     tags: [TipoAtividade]
 */
TipoAtividadeRoutes.post('/', authMiddleware, (req, res, next) =>
  tipoAtividadeController.incluir(req, res, next)
)

/**
 * @swagger
 * /tipoAtividade/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [TipoAtividade]
 */
TipoAtividadeRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  tipoAtividadeController.excluir(req, res, next)
)

/**
 * @swagger
 * /tipoAtividade/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [TipoAtividade]
 */
TipoAtividadeRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  tipoAtividadeController.atualizar(req, res, next)
)

export default TipoAtividadeRoutes
