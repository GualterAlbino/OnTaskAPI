//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import CriarUsuarioDTO from '../../../application/usuario/dto/CriarUsuarioDTO'
import QueryUsuarioDTO from '../../../application/usuario/dto/QueryUsuarioDTO'
import AtualizarUsuarioDTO from '../../../application/usuario/dto/AtualizarUsuarioDTO'

import UsuarioHandler from './UsuarioHandler'

export default class UsuarioController {
  private usuarioHandler: UsuarioHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pUsuarioHandler: UsuarioHandler) {
    this.usuarioHandler = pUsuarioHandler
  }

  async incluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const dto = new CriarUsuarioDTO(body)

      const retorno = await this.usuarioHandler.incluir(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = new QueryUsuarioDTO(req.body)
      const tasks = await this.usuarioHandler.buscar(queryParams)
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
      const retorno = await this.usuarioHandler.excluir(params.id)
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
      const dto = new AtualizarUsuarioDTO(body)

      const retorno = await this.usuarioHandler.atualizar(params.id, dto)
      res.status(200).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
