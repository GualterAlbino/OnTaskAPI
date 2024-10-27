// Application
import AtividadeService from '../../../application/atividade/AtividadeService'
import CriarAtividadeDTO from '../../../application/atividade/dto/CriarAtividadeDTO'
import QueryAtividadeDTO from '../../../application/atividade/dto/QueryAtividadeDTO'
import ListarAtividadeDTO from '../../../application/atividade/dto/ListarAtividadeDTO'
import AtualizarAtividadeDTO from '../../../application/atividade/dto/AtualizarAtividadeDTO'

// Shared
import Logger from '../../../shared/utils/Logger'

export default class AtividadeHandler {
  private atividadeService: AtividadeService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pAtividadeService: AtividadeService) {
    this.atividadeService = pAtividadeService
  }

  async incluir(pRegistro: CriarAtividadeDTO): Promise<ListarAtividadeDTO> {
    try {
      const usuario = await this.atividadeService.incluir(pRegistro)
      return new ListarAtividadeDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async buscar(pParams: QueryAtividadeDTO): Promise<ListarAtividadeDTO[]> {
    try {
      // Passa os parâmetros de busca para o serviço
      const usuarios = await this.atividadeService.buscar(pParams)
      return usuarios.map((usuario) => new ListarAtividadeDTO(usuario))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ListarAtividadeDTO> {
    try {
      const usuario = await this.atividadeService.excluir(pId)
      return new ListarAtividadeDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarAtividadeDTO
  ): Promise<ListarAtividadeDTO> {
    try {
      const usuario = await this.atividadeService.atualizar(pId, pRegistro)
      return new ListarAtividadeDTO(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
