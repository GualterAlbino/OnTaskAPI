//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application

import QueryProjetoDTO from '../../../application/projeto/dto/QueryProjetoDTO'
import CriarProjetoDTO from '../../../application/projeto/dto/CriarProjetoDTO'
import ListarProjetoDTO from '../../../application/projeto/dto/ListarProjetoDTO'
import SessaoAuthDTO from '../../../application/security/dto/SessaoAuthDTO'

// Adapters
import ProjetoHandler from './PermissaoUsuarioProjetoHandler'
import AtualizarProjetoDTO from '../../../application/projeto/dto/AtualizarProjetoDTO'

export default class GrupoController {
  private handler: ProjetoHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pHandler: ProjetoHandler) {
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
      const dto = new CriarProjetoDTO(body)
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
      const queryParams = new QueryProjetoDTO(req.body)
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
      const dto = new AtualizarProjetoDTO(body)
      const sessao = new SessaoAuthDTO(jwtPayload)

      const retorno = await this.handler.atualizar(params.id, dto, sessao)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
