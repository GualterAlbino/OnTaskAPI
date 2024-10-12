// Bilbioteca
import { Router } from 'express'

// Middleware
import { authMiddleware } from '../middleware/AuthMiddleware'

import AtividadeHandler from '../../../adapters/http/atividade/AtividadeHandler'
import AtividadeService from '../../../application/atividade/AtividadeService'
import AtividadeController from '../../../adapters/http/atividade/AtividadeController'
import AtividadePostgresRepository from '../../../adapters/postgres/atividade/AtividadePostgresRepository'
import UsuarioPostgresRepository from '../../../adapters/postgres/usuario/UsuarioPostgresRepository'
import ProjetoPostgresRepository from '../../../adapters/postgres/projeto/ProjetoPostgresRepository'
import TipoAtividadePostgresRepository from '../../../adapters/postgres/tipo-atividade/TipoAtividadePostgresRepository'
import UsuarioService from '../../../application/usuario/UsuarioService'
import ProjetoService from '../../../application/projeto/ProjetoService'
import GrupoService from '../../../application/grupo/GrupoService'
import GrupoPostgresRepository from '../../../adapters/postgres/grupo/GrupoPostgresRepository'
import GrupoUsuarioPostgresRepository from '../../../adapters/postgres/grupo-usuario/GrupoUsuarioPostgresRepository'
import GrupoUsuarioService from '../../../application/grupo-usuario/GrupoUsuarioService'
import StatusPostgresRepository from '../../../adapters/postgres/status/StatusPostgresRepository'
import StatusService from '../../../application/status/StatusService'
import TipoStatusPostgresRepository from '../../../adapters/postgres/tipo-status/TipoStatusPostgresRepository'
import TipoStatusService from '../../../application/tipo-status/TipoStatusService'
import TipoAtividadeService from '../../../application/tipo-atividade/TipoAtividadeService'

const AtividadeRoutes = Router()

const atividadeRepository = new AtividadePostgresRepository()
const usuarioRepository = new UsuarioPostgresRepository()
const projetoRepository = new ProjetoPostgresRepository()
const tipoAtividadeRepository = new TipoAtividadePostgresRepository()
const grupoRepository = new GrupoPostgresRepository()
const grupoUsuarioRepository = new GrupoUsuarioPostgresRepository()
const grupoUsuarioService = new GrupoUsuarioService(grupoUsuarioRepository)
const grupoService = new GrupoService(grupoRepository, grupoUsuarioService)
const statusRepository = new StatusPostgresRepository()
const tipoStatusRepository = new TipoStatusPostgresRepository()
const tipoStatusService = new TipoStatusService(tipoStatusRepository)
const statusService = new StatusService(statusRepository, tipoStatusService)
const tipoAtividadeService = new TipoAtividadeService(tipoAtividadeRepository)

const usuarioService = new UsuarioService(usuarioRepository)
const projetoService = new ProjetoService(
  projetoRepository,
  grupoService,
  statusService
)
const atividadeService = new AtividadeService(
  atividadeRepository,
  usuarioService,
  projetoService,
  tipoAtividadeService
)

const atividadeHandler = new AtividadeHandler(atividadeService)
const atividadeController = new AtividadeController(atividadeHandler)

/**
 * @swagger
 * /atividade:
 *   get:
 *     summary: Lista todos os registros
 *     tags: [Atividade]
 */
AtividadeRoutes.get('/', authMiddleware, (req, res, next) =>
  atividadeController.buscar(req, res, next)
)

/**
 * @swagger
 * /atividade:
 *   post:
 *     summary: Cria um registro
 *     tags: [Atividade]
 */
AtividadeRoutes.post('/', authMiddleware, (req, res, next) =>
  atividadeController.incluir(req, res, next)
)

/**
 * @swagger
 * /atividade/{id}:
 *   delete:
 *     summary: Exclui um registro
 *     tags: [Atividade]
 */
AtividadeRoutes.delete('/:id', authMiddleware, (req, res, next) =>
  atividadeController.excluir(req, res, next)
)

/**
 * @swagger
 * /atividade/{id}:
 *   patch:
 *     summary: Atualiza um registro
 *     tags: [Atividade]
 */
AtividadeRoutes.patch('/:id', authMiddleware, (req, res, next) =>
  atividadeController.atualizar(req, res, next)
)

export default AtividadeRoutes
