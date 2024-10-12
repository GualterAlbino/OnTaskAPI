//Domain
import TipoAtividadeModel from '../../domain/tipo-atividade/TipoAtividadeModel'
import TipoAtividadeRepository from '../../domain/tipo-atividade/TipoAtividadeRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import CriarTipoAtividadeDTO from './dto/CriarTipoAtividadeDTO'
import AtualizarTipoAtividadeDTO from './dto/AtualizarTipoAtividadeDTO'
import QueryTipoAtividadeDTO from './dto/QueryTipoAtividadeDTO'
import {
  TipoAtividadeNotFoundException,
  TipoAtividadeInternalServicException
} from './exceptions/TipoAtividadeExceptions'

export default class TipoAtividadeService {
  private readonly respository: TipoAtividadeRepository
  private readonly logger = new Logger(this.constructor.name)

  constructor(pRepository: TipoAtividadeRepository) {
    this.respository = pRepository
  }

  async incluir(pRegistro: CriarTipoAtividadeDTO): Promise<TipoAtividadeModel> {
    try {
      const registro = await this.respository.incluir(pRegistro.toDomain())

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new TipoAtividadeInternalServicException(error, 'Erro ao incluir!')
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarTipoAtividadeDTO
  ): Promise<TipoAtividadeModel> {
    try {
      const updatedRegistro = await this.respository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new TipoAtividadeNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new TipoAtividadeInternalServicException(
        error,
        'Erro ao atualizar o registro!'
      )
    }
  }

  async buscar(pParams: QueryTipoAtividadeDTO): Promise<TipoAtividadeModel[]> {
    try {
      const registros = await this.respository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new TipoAtividadeInternalServicException(
        error,
        'Erro ao buscar os usuários!'
      )
    }
  }

  async excluir(pId: string): Promise<TipoAtividadeModel> {
    try {
      const registro = await this.respository.excluir(pId)

      if (!registro) {
        throw new TipoAtividadeNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new TipoAtividadeInternalServicException(
        error,
        'Erro ao excluir o registro!'
      )
    }
  }
}
