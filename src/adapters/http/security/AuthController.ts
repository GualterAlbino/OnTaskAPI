//Express
import { NextFunction, Request, Response } from 'express'

//Shared
import Logger from '../../../shared/utils/Logger'

// Application
import RequestAuthDTO from '../../../application/security/dto/RequestAuthDTO'

import AuthHandler from './AuthHandler'

export default class AuthController {
  private authHandler: AuthHandler
  private readonly logger = new Logger(this.constructor.name)

  constructor(pAuthHandler: AuthHandler) {
    this.authHandler = pAuthHandler
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body
      const dto = new RequestAuthDTO(body.email, body.senha)

      const retorno = await this.authHandler.login(dto)
      res.status(201).send(retorno)
    } catch (error) {
      this.logger.error(error)
      next(error)
    }
  }
}
