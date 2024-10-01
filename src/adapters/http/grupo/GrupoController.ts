//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarGrupoDTO from '../../../application/grupo/dto/CriarGrupoDTO'
import QueryGrupoDTO from '../../../application/grupo/dto/QueryGrupoDTO'
import AtualizarGrupoDTO from '../../../application/grupo/dto/AtualizarGrupoDTO'

// Adapters
import GrupoHandler from '../../../adapters/http/grupo/GrupoHandler'
import SessaoAuthDTO from '../../../application/security/dto/SessaoAuthDTO'

export default class GrupoController {
  private handler: GrupoHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pHandler: GrupoHandler) {
    this.handler = pHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const jwtPayload = req.sessao
      const dto = new CriarGrupoDTO(body)
      const sessao = new SessaoAuthDTO(jwtPayload)

      const retorno = await this.handler.incluir(dto, sessao)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryGrupoDTO(req.body)
      const retorno = await this.handler.buscar(queryParams)
      res.status(200).json(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.params
      const retorno = await this.handler.excluir(params.id)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const params = req.params
      const jwtPayload = req.sessao
      const dto = new AtualizarGrupoDTO(body)
      const sessao = new SessaoAuthDTO(jwtPayload)

      const retorno = await this.handler.atualizar(params.id, dto, sessao)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
