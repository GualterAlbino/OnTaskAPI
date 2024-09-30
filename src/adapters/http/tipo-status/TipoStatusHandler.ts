// Application
import TipoStatusService from '../../../application/tipo-status/TipoStatusService'
import QueryTipoStatusDTO from '../../../application/tipo-status/dto/QueryTipoStatusDTO'
import CriarTipoStatusDTO from '../../../application/tipo-status/dto/CriarTipoStatusDTO'
import ListarTipoStatusDTO from '../../../application/tipo-status/dto/ListarTipoStatusDTO'

// Shared
import Logger from '../../../shared/utils/Logger'
import AtualizarTipoStatusDTO from '../../../application/tipo-status/dto/AtualizarTipoStatusDTO'

export default class TipoStatusHandler {
  private service: TipoStatusService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pService: TipoStatusService) {
    this.service = pService
  }

  async incluir(pRegistro: CriarTipoStatusDTO): Promise<ListarTipoStatusDTO> {
    try {
      const registro = await this.service.incluir(pRegistro)
      return new ListarTipoStatusDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryTipoStatusDTO): Promise<ListarTipoStatusDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const registros = await this.service.buscar(pParams)
      return registros.map((registro) => new ListarTipoStatusDTO(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarTipoStatusDTO> {
    try {
      const registro = await this.service.excluir(pId)
      return new ListarTipoStatusDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarTipoStatusDTO
  ): Promise<ListarTipoStatusDTO> {
    try {
      const usuario = await this.service.atualizar(pId, pRegistro)
      return new ListarTipoStatusDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
