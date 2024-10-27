//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarAtividadeDTO from '../../../application/atividade/dto/CriarAtividadeDTO'
import QueryAtividadeDTO from '../../../application/atividade/dto/QueryAtividadeDTO'
import AtualizarAtividadeDTO from '../../../application/atividade/dto/AtualizarAtividadeDTO'

import AtividadeHandler from './DificuldadeAtividadeHandler'
import DificuldadeAtividadeHandler from './DificuldadeAtividadeHandler'
import CriarDificuldadeAtividadeDTO from '../../../application/dificuldade-atividade/dto/CriarDificuldadeAtividadeDTO'

export default class DificuldadeAtividadeController {
  private atividadeHandler: DificuldadeAtividadeHandler
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
      const dto = new CriarDificuldadeAtividadeDTO(body)

      console.log('pRegistro.toDomain()', dto)

      const retorno = await this.atividadeHandler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
