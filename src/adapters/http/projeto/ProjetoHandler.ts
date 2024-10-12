// Application
import ProjetoService from '../../../application/projeto/ProjetoService'
import QueryProjetoDTO from '../../../application/projeto/dto/QueryProjetoDTO'
import CriarProjetoDTO from '../../../application/projeto/dto/CriarProjetoDTO'
import ListarProjetoDTO from '../../../application/projeto/dto/ListarProjetoDTO'
import SessaoAuthDTO from '../../../application/security/dto/SessaoAuthDTO'
import AtualizarProjetoDTO from '../../../application/projeto/dto/AtualizarProjetoDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class ProjetoHandler {
  private readonly service: ProjetoService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pService: ProjetoService) {
    this.service = pService
  }

  async incluir(
    pRegistro: CriarProjetoDTO,
    pSessaoUsuario: SessaoAuthDTO
  ): Promise<ListarProjetoDTO> {
    try {
      const registro = await this.service.incluir(pRegistro, pSessaoUsuario)
      return new ListarProjetoDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryProjetoDTO): Promise<ListarProjetoDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const registros = await this.service.buscar(pParams)
      return registros.map((registro) => new ListarProjetoDTO(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarProjetoDTO> {
    try {
      const registro = await this.service.excluir(pId)
      return new ListarProjetoDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarProjetoDTO,
    pSessaoUsuario: SessaoAuthDTO
  ): Promise<ListarProjetoDTO> {
    try {
      const usuario = await this.service.atualizar(
        pId,
        pRegistro,
        pSessaoUsuario
      )
      return new ListarProjetoDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
