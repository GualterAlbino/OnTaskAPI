// Bibliotecas
import jwt from 'jsonwebtoken'

// Application
import RequestAuthDTO from './dto/RequestAuthDTO'
import ResponseAuthDTO from './dto/ResponseAuthDTO'

// Domain
import UsuarioModel from '../../domain/usuario/UsuarioModel'
import UsuarioRepository from '../../domain/usuario/UsuarioRepository'

// Shared
import Logger from '../../shared/utils/Logger'

// Infrastructure
import BCryptEncoderPassword from '../../infrastructure/bcrypt/BCryptEncoderPassword'
import TokenJWTConfig from '../../infrastructure/express/security/TokenJWTConfig'
import {
  SecurityForbiddenException,
  SecurityUnauthorizedException
} from './exceptions/SecurityException'

export default class AuthService {
  private readonly usuarioRepository: UsuarioRepository
  private readonly logger = new Logger(this.constructor.name)

  constructor(pUsuarioRepository: UsuarioRepository) {
    this.usuarioRepository = pUsuarioRepository
  }

  async login(pRequestAuth: RequestAuthDTO): Promise<ResponseAuthDTO> {
    try {
      const usuarios = await this.usuarioRepository.buscar({
        email: pRequestAuth.email
      })

      // Verifica se o usuário existe
      if (usuarios.length === 0) {
        throw new SecurityUnauthorizedException(
          '',
          'Não existe usuário associado a este e-mail!'
        )
      }

      // Verifica se a senha está correta
      const senhaValida = await BCryptEncoderPassword.descriptografarSenha(
        usuarios[0].senha,
        pRequestAuth.senha
      )

      if (!senhaValida) {
        throw new SecurityUnauthorizedException('', 'Credenciais Incorretas!')
      }

      const token = this.gerarToken(usuarios[0])
      return new ResponseAuthDTO(token, new Date(), new Date())
    } catch (error) {
      this.logger.error(error)
      throw new SecurityUnauthorizedException(
        error,
        'Erro ao realizar a autenticação'
      )
    }
  }

  gerarToken(pUsuario: UsuarioModel): string {
    try {
      const infoToken = {
        id: pUsuario.id,
        role: pUsuario.role,
        email: pUsuario.email
      }

      return jwt.sign(infoToken, TokenJWTConfig.secretJWT, {
        expiresIn: TokenJWTConfig.expiracaoToken
      })
    } catch (error) {
      this.logger.error(error)
      throw new SecurityUnauthorizedException(error, 'Token inválido!')
    }
  }

  async validarToken(pToken: string): Promise<void> {
    try {
      jwt.verify(pToken, TokenJWTConfig.secretJWT)
    } catch (error) {
      this.logger.error(error)
      throw new SecurityUnauthorizedException(error, 'Token inválido!')
    }
  }

  static obterSessaoToken(pToken: string): UsuarioModel {
    try {
      const decoded = jwt.verify(pToken, TokenJWTConfig.secretJWT)
      return decoded as UsuarioModel
    } catch (error) {
      throw new SecurityUnauthorizedException(error, 'Token inválido!')
    }
  }
}
