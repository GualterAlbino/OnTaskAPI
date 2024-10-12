//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarTipoAtividadeDTO from '../../../application/tipo-atividade/dto/CriarTipoAtividadeDTO'
import AtualizarTipoAtividadeDTO from '../../../application/tipo-atividade/dto/AtualizarTipoAtividadeDTO'
import QueryTipoAtividadeDTO from '../../../application/tipo-atividade/dto/QueryTipoAtividadeDTO'

// Adapters
import TipoAtividadeHandler from './TipoAtividadeHandler'

export default class TipoStatusController {
  private readonly handler: TipoAtividadeHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pHandler: TipoAtividadeHandler) {
    this.handler = pHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const dto = new CriarTipoAtividadeDTO(body)

      const retorno = await this.handler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryTipoAtividadeDTO(req.body)
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
      const params = req.params
      const body = req.body
      const dto = new AtualizarTipoAtividadeDTO(body)

      const retorno = await this.handler.atualizar(params.id, dto)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
