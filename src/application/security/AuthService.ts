// Bibliotecas
import jwt from 'jsonwebtoken'

// Application
import SessaoAuthDTO from './dto/SessaoAuthDTO'
import RequestAuthDTO from './dto/RequestAuthDTO'
import ResponseAuthDTO from './dto/ResponseAuthDTO'
import QueryUsuarioDTO from '../usuario/dto/QueryUsuarioDTO'
import QueryGrupoUsuarioDTO from '../grupo-usuario/dto/QueryGrupoUsuarioDTO'

import UsuarioService from '../usuario/UsuarioService'
import GrupoUsuarioService from '../grupo-usuario/GrupoUsuarioService'

// Domain
import UsuarioModel from '../../domain/usuario/UsuarioModel'
import GrupoUsuarioModel from '../../domain/grupo-usuario/GrupoUsuarioModel'

// Shared
import Logger from '../../shared/utils/Logger'

// Infrastructure
import BCryptEncoderPassword from '../../infrastructure/bcrypt/BCryptEncoderPassword'
import TokenJWTConfig from '../../infrastructure/express/security/TokenJWTConfig'
import { SecurityUnauthorizedException } from './exceptions/SecurityException'

export default class AuthService {
  private readonly usuarioService: UsuarioService
  private readonly grupoUsuarioService: GrupoUsuarioService

  private readonly logger = new Logger(this.constructor.name)

  constructor(
    pUsuarioService: UsuarioService,
    pGrupoUsuarioService: GrupoUsuarioService
  ) {
    ;(this.usuarioService = pUsuarioService),
      (this.grupoUsuarioService = pGrupoUsuarioService)
  }

  async login(pRequestAuth: RequestAuthDTO): Promise<ResponseAuthDTO> {
    try {
      const usuarios = await this.usuarioService.buscar(
        new QueryUsuarioDTO({ email: pRequestAuth.email })
      )

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

      // Busca os grupos associados ao usuário
      const grupos = await this.grupoUsuarioService.buscar(
        new QueryGrupoUsuarioDTO({
          usuarioId: usuarios[0].id
        })
      )

      const token = this.gerarToken(usuarios[0], grupos)

      return new ResponseAuthDTO(token, new Date(), new Date())
    } catch (error) {
      this.logger.error(error)
      throw new SecurityUnauthorizedException(
        error,
        'Erro ao realizar a autenticação'
      )
    }
  }

  gerarToken(pUsuario: UsuarioModel, pGrupos: GrupoUsuarioModel[]): string {
    try {
      const infoToken: SessaoAuthDTO = {
        id: pUsuario.id,
        nome: pUsuario.nome,
        role: pUsuario.role,
        email: pUsuario.email,
        grupos: pGrupos.length > 0 ? pGrupos.map((grupo) => grupo.id) : [],
        criadoEm: new Date(),
        alteradoEm: new Date()
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
