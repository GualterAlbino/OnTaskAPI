//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarStatusDTO from '../../../application/status/dto/CriarStatusDTO'
import QueryStatusDTO from '../../../application/status/dto/QueryStatusDTO'
import AtualizarStatusDTO from '../../../application/status/dto/AtualizarStatusDTO'

// Adapters
import StatusHandler from '../../../adapters/http/status/StatusHandler'

export default class StatusController {
  private handler: StatusHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pHandler: StatusHandler) {
    this.handler = pHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const dto = new CriarStatusDTO(body)

      const retorno = await this.handler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryStatusDTO(req.body)
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
      const dto = new AtualizarStatusDTO(body)

      const retorno = await this.handler.atualizar(params.id, dto)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
