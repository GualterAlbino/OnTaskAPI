//Domain

import DificuldadeAtividadeModel from '../../domain/dificuldade-atividade/DificuldadeAtividadeModel'
import DificuldadeAtividadeRepository from '../../domain/dificuldade-atividade/DificuldadeAtividadeRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import CriarDificuldadeAtividadeDTO from './dto/CriarDificuldadeAtividadeDTO'

import { DificuldadeAtividadeInternalServicException } from './exceptions/DificuldadeAtividadeExceptions'

export default class DificuldadeAtividadeService {
  private readonly repository: DificuldadeAtividadeRepository

  private readonly logger = new Logger(this.constructor.name)

  constructor(pAtividadeRepository: DificuldadeAtividadeRepository) {
    this.repository = pAtividadeRepository
  }

  async incluir(
    pRegistro: CriarDificuldadeAtividadeDTO
  ): Promise<DificuldadeAtividadeModel> {
    try {
      const registro = await this.repository.incluir(pRegistro.toDomain())

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new DificuldadeAtividadeInternalServicException(
        error,
        'Erro ao incluir Registro!'
      )
    }
  }
}
