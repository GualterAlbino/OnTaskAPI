// Application
import AuthService from '../../../application/security/AuthService'
import RequestAuthDTO from '../../../application/security/dto/RequestAuthDTO'
import ResponseAuthDTO from '../../../application/security/dto/ResponseAuthDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class AuthHandler {
  private authService: AuthService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pAuthService: AuthService) {
    this.authService = pAuthService
  }

  async login(pRequestAuth: RequestAuthDTO): Promise<ResponseAuthDTO> {
    try {
      const retorno = await this.authService.login(pRequestAuth)

      return retorno
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
