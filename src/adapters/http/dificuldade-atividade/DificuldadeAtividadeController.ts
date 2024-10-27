//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarAtividadeDTO from '../../../application/atividade/dto/CriarAtividadeDTO'
import QueryAtividadeDTO from '../../../application/atividade/dto/QueryAtividadeDTO'
import AtualizarAtividadeDTO from '../../../application/atividade/dto/AtualizarAtividadeDTO'

import AtividadeHandler from './DificuldadeAtividadeHandler'

export default class AtividadeController {
  private atividadeHandler: AtividadeHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pAtividadeHandler: AtividadeHandler) {
    this.atividadeHandler = pAtividadeHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const dto = new CriarAtividadeDTO(body)

      console.log('pRegistro.toDomain()', dto)

      const retorno = await this.atividadeHandler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryAtividadeDTO(req.body)
      const tasks = await this.atividadeHandler.buscar(queryParams)
      res.status(200).json(tasks)
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
      const retorno = await this.atividadeHandler.excluir(params.id)
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
      const params = req.params
      const body = req.body
      const dto = new AtualizarAtividadeDTO(body)

      const retorno = await this.atividadeHandler.atualizar(params.id, dto)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
