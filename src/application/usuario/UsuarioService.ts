//Domain
import UsuarioModel from '../../domain/usuario/UsuarioModel'
import UsuarioRepository from '../../domain/usuario/UsuarioRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import QueryUsuarioDTO from './dto/QueryUsuarioDTO'
import CriarUsuarioDTO from './dto/CriarUsuarioDTO'
import AtualizarUsuarioDTO from './dto/AtualizarUsuarioDTO'
import BCryptEncoderPassword from '../../infrastructure/bcrypt/BCryptEncoderPassword'
import {
  UsuarioInternalServicException,
  UsuarioNotFoundException
} from './exceptions/UsuarioExeptions'

export default class UsuarioService {
  private readonly usuarioRepository: UsuarioRepository
  private readonly logger = new Logger(this.constructor.name)

  constructor(pUsuarioRepository: UsuarioRepository) {
    this.usuarioRepository = pUsuarioRepository
  }

  async incluir(pRegistro: CriarUsuarioDTO): Promise<UsuarioModel> {
    try {
      const usuarios = await this.usuarioRepository.buscar({
        email: pRegistro.email
      })

      if (usuarios.length > 0) {
        throw new UsuarioInternalServicException(
          '',
          'Este e-mail já está sendo utilizado por outro usuário!'
        )
      }

      // Criptografa a senha
      pRegistro.senha = await BCryptEncoderPassword.criptografarSenha(
        pRegistro.senha
      )

      const usuario = await this.usuarioRepository.incluir(pRegistro.toDomain())

      return usuario
    } catch (error) {
      this.logger.error(error)
      throw new UsuarioInternalServicException(
        error,
        'Erro ao incluir usuário!'
      )
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarUsuarioDTO
  ): Promise<UsuarioModel> {
    try {
      if (pRegistro.senha) {
        // Criptografa a senha
        pRegistro.senha = await BCryptEncoderPassword.criptografarSenha(
          pRegistro.senha
        )
      }

      const updatedUsuario = await this.usuarioRepository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedUsuario) {
        throw new UsuarioNotFoundException(
          '',
          'Usuário não encontrado para atualização!'
        )
      }

      return updatedUsuario
    } catch (error) {
      this.logger.error(error)
      throw new UsuarioInternalServicException(
        error,
        'Erro ao atualizar o usuário!'
      )
    }
  }

  async buscar(pParams: QueryUsuarioDTO): Promise<UsuarioModel[]> {
    try {
      const usuarios = await this.usuarioRepository.buscar(pParams)

      return usuarios
    } catch (error) {
      this.logger.error(error)
      throw new UsuarioInternalServicException(
        error,
        'Erro ao buscar os usuários!'
      )
    }
  }

  async excluir(pId: string): Promise<UsuarioModel> {
    try {
      const usuario = await this.usuarioRepository.excluir(pId)

      if (!usuario) {
        throw new UsuarioNotFoundException(
          '',
          'Usuário não encontrado para exclusão!'
        )
      }

      return usuario
    } catch (error) {
      this.logger.error(error)
      throw new UsuarioInternalServicException(
        error,
        'Erro ao excluir o usuário!'
      )
    }
  }
}
