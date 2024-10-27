// Application
import AtividadeService from '../../../application/atividade/AtividadeService'
import CriarAtividadeDTO from '../../../application/atividade/dto/CriarAtividadeDTO'
import QueryAtividadeDTO from '../../../application/atividade/dto/QueryAtividadeDTO'
import ListarAtividadeDTO from '../../../application/atividade/dto/ListarAtividadeDTO'
import AtualizarAtividadeDTO from '../../../application/atividade/dto/AtualizarAtividadeDTO'

import DificuldadeAtividadeService from '../../../application/dificuldade-atividade/DificuldadeAtividadeService'

// Shared
import Logger from '../../../shared/utils/Logger'
import CriarDificuldadeAtividadeDTO from '../../../application/dificuldade-atividade/dto/CriarDificuldadeAtividadeDTO'

export default class DificuldadeAtividadeHandler {
  private readonly atividadeService: DificuldadeAtividadeService
  private readonly logger = new Logger(this.constructor.name)

  constructor(pAtividadeService: DificuldadeAtividadeService) {
    this.atividadeService = pAtividadeService
  }

  async incluir(pRegistro: CriarDificuldadeAtividadeDTO): Promise<any> {
    try {
      const registro = await this.atividadeService.incluir(pRegistro)
      return registro
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
