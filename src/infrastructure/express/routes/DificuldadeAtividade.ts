// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import DificuldadeAtividadePostgresRepository from '../../../adapters/postgres/diculdade-atividade/DificuldadeAtividadePostgresRepository'
import DificuldadeAtividadeService from '../../../application/dificuldade-atividade/DificuldadeAtividadeService'
import DificuldadeAtividadeHandler from '../../../adapters/http/dificuldade-atividade/DificuldadeAtividadeHandler'
import DificuldadeAtividadeController from '../../../adapters/http/dificuldade-atividade/DificuldadeAtividadeController'

const DificuldadeAtividade = Router()

const dificuldadeAtividadeRepository =
  new DificuldadeAtividadePostgresRepository()

const dificuldadeAtividadeService = new DificuldadeAtividadeService(
  dificuldadeAtividadeRepository
)

const dificuldadeHandler = new DificuldadeAtividadeHandler(
  dificuldadeAtividadeService
)
const dificuldadeController = new DificuldadeAtividadeController(
  dificuldadeHandler
)

/**
 * @swagger
 * /dificuldadeAtividade:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [Dificuldade Atividade]
 */
DificuldadeAtividade.get('/', authMiddleware, (req, res, next) =>
  dificuldadeController.incluir(req, res, next)
)

/**
 * @swagger
 * /dificuldadeAtividade:
 *   post:
 *     summary: Cria um registro
 *     tags: [Dificuldade Atividade]
 */
DificuldadeAtividade.post('/', authMiddleware, (req, res, next) =>
  dificuldadeController.incluir(req, res, next)
)

/**
 * @swagger
 * /dificuldadeAtividade/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [Dificuldade Atividade]
 */
DificuldadeAtividade.delete('/:id', authMiddleware, (req, res, next) =>
  dificuldadeController.incluir(req, res, next)
)

/**
 * @swagger
 * /dificuldadeAtividade/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [Dificuldade Atividade]
 */
DificuldadeAtividade.patch('/:id', authMiddleware, (req, res, next) =>
  dificuldadeController.incluir(req, res, next)
)

export default DificuldadeAtividade
