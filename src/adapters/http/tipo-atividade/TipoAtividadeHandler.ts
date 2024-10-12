// Application
import TipoAtividadeModel from '../../../domain/tipo-atividade/TipoAtividadeModel'
import TipoAtividadeService from '../../../application/tipo-atividade/TipoAtividadeService'
import CriarTipoAtividadeDTO from '../../../application/tipo-atividade/dto/CriarTipoAtividadeDTO'
import QueryTipoAtividadeDTO from '../../../application/tipo-atividade/dto/QueryTipoAtividadeDTO'
import ListarTipoAtividadeDTO from '../../../application/tipo-atividade/dto/ListarTipoAtividadeDTO'
import AtualizarTipoAtividadeDTO from '../../../application/tipo-atividade/dto/AtualizarTipoAtividadeDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class TipoAtividadeHandler {
  private readonly service: TipoAtividadeService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pService: TipoAtividadeService) {
    this.service = pService
  }

  async incluir(
    pRegistro: CriarTipoAtividadeDTO
  ): Promise<ListarTipoAtividadeDTO> {
    try {
      const registro = await this.service.incluir(pRegistro)
      return new ListarTipoAtividadeDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(
    pParams: QueryTipoAtividadeDTO
  ): Promise<ListarTipoAtividadeDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const registros = await this.service.buscar(pParams)
      return registros.map((registro) => new ListarTipoAtividadeDTO(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarTipoAtividadeDTO> {
    try {
      const registro = await this.service.excluir(pId)
      return new ListarTipoAtividadeDTO(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarTipoAtividadeDTO
  ): Promise<ListarTipoAtividadeDTO> {
    try {
      const usuario = await this.service.atualizar(pId, pRegistro)
      return new ListarTipoAtividadeDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
