//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarTipoStatusDTO from '../../../application/tipo-status/dto/CriarTipoStatusDTO'
import QueryTipoStatusDTO from '../../../application/tipo-status/dto/QueryTipoStatusDTO'
import AtualizarTipoStatusDTO from '../../../application/tipo-status/dto/AtualizarTipoStatusDTO'

// Adapters
import TipoStatusHandler from './TipoStatusHandler'

export default class TipoStatusController {
  private handler: TipoStatusHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pHandler: TipoStatusHandler) {
    this.handler = pHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const dto = new CriarTipoStatusDTO(body)

      const retorno = await this.handler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryTipoStatusDTO(req.body)
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
      const dto = new AtualizarTipoStatusDTO(body)

      const retorno = await this.handler.atualizar(params.id, dto)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
