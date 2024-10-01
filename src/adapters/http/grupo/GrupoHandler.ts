// Application
import GrupoService from '../../../application/grupo/GrupoService'
import QueryGrupoDTO from '../../../application/grupo/dto/QueryGrupoDTO'
import CriarGrupoDTO from '../../../application/grupo/dto/CriarGrupoDTO'
import ListarGrupoDTO from '../../../application/grupo/dto/ListarGrupoDTO'
import SessaoAuthDTO from '../../../application/security/dto/SessaoAuthDTO'
import AtualizarGrupoDTO from '../../../application/grupo/dto/AtualizarGrupoDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class GrupoHandler {
  private readonly service: GrupoService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pService: GrupoService) {
    this.service = pService
  }

  async incluir(
    pRegistro: CriarGrupoDTO,
    pSessaoUsuario: SessaoAuthDTO
  ): Promise<ListarGrupoDTO> {
    try {
      const registro = await this.service.incluir(pRegistro, pSessaoUsuario)
      return new ListarGrupoDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryGrupoDTO): Promise<ListarGrupoDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const registros = await this.service.buscar(pParams)
      return registros.map((registro) => new ListarGrupoDTO(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarGrupoDTO> {
    try {
      const registro = await this.service.excluir(pId)
      return new ListarGrupoDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarGrupoDTO,
    pSessaoUsuario: SessaoAuthDTO
  ): Promise<ListarGrupoDTO> {
    try {
      const usuario = await this.service.atualizar(
        pId,
        pRegistro,
        pSessaoUsuario
      )
      return new ListarGrupoDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
