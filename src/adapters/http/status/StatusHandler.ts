// Application
import StatusService from '../../../application/status/StatusService'
import QueryStatusDTO from '../../../application/status/dto/QueryStatusDTO'
import CriarStatusDTO from '../../../application/status/dto/CriarStatusDTO'
import ListarStatusDTO from '../../../application/status/dto/ListarStatusDTO'
import AtualizarStatusDTO from '../../../application/status/dto/AtualizarStatusDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class StatusHandler {
  private service: StatusService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pService: StatusService) {
    this.service = pService
  }

  async incluir(pRegistro: CriarStatusDTO): Promise<ListarStatusDTO> {
    try {
      const registro = await this.service.incluir(pRegistro)
      return new ListarStatusDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryStatusDTO): Promise<ListarStatusDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const registros = await this.service.buscar(pParams)
      return registros.map((registro) => new ListarStatusDTO(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarStatusDTO> {
    try {
      const registro = await this.service.excluir(pId)
      return new ListarStatusDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarStatusDTO
  ): Promise<ListarStatusDTO> {
    try {
      const usuario = await this.service.atualizar(pId, pRegistro)
      return new ListarStatusDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
