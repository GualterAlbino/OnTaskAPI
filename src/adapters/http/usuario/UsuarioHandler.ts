// Application
import UsuarioService from '../../../application/usuario/UsuarioService'
import CriarUsuarioDTO from '../../../application/usuario/dto/CriarUsuarioDTO'
import QueryUsuarioDTO from '../../../application/usuario/dto/QueryUsuarioDTO'
import ListarUsuarioDTO from '../../../application/usuario/dto/ListarUsuarioDTO'
import AtualizarUsuarioDTO from '../../../application/usuario/dto/AtualizarUsuarioDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class UsuarioHandler {
  private usuarioService: UsuarioService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pUsuarioService: UsuarioService) {
    this.usuarioService = pUsuarioService
  }

  async incluir(pRegistro: CriarUsuarioDTO): Promise<ListarUsuarioDTO> {
    try {
      const usuario = await this.usuarioService.incluir(pRegistro)
      return new ListarUsuarioDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryUsuarioDTO): Promise<ListarUsuarioDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const usuarios = await this.usuarioService.buscar(pParams)
      return usuarios.map((usuario) => new ListarUsuarioDTO(usuario))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarUsuarioDTO> {
    try {
      const usuario = await this.usuarioService.excluir(pId)
      return new ListarUsuarioDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarUsuarioDTO
  ): Promise<ListarUsuarioDTO> {
    try {
      const usuario = await this.usuarioService.atualizar(pId, pRegistro)
      return new ListarUsuarioDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
