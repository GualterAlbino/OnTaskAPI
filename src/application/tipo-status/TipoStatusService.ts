//Domain
import TipoStatusModel from '../../domain/tipo-status/TipoStatusModel'
import TipoStatusRepository from '../../domain/tipo-status/TipoStatusRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import CriarTipoStatusDTO from './dto/CriarTipoStatusDTO'
import AtualizarTipoStatusDTO from './dto/AtualizarTipoStatusDTO'
import {
  TipoStatusNotFoundException,
  TipoStatusInternalServicException
} from './exceptions/TipoStatusExceptions'
import QueryTipoStatusDTO from './dto/QueryTipoStatusDTO'

export default class TipoStatusService {
  private readonly respository: TipoStatusRepository
  private readonly logger = new Logger(this.constructor.name)

  constructor(pRepository: TipoStatusRepository) {
    this.respository = pRepository
  }

  async incluir(pRegistro: CriarTipoStatusDTO): Promise<TipoStatusModel> {
    try {
      const registro = await this.respository.incluir(pRegistro.toDomain())

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new TipoStatusInternalServicException(error, 'Erro ao incluir!')
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarTipoStatusDTO
  ): Promise<TipoStatusModel> {
    try {
      const updatedRegistro = await this.respository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new TipoStatusNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new TipoStatusInternalServicException(
        error,
        'Erro ao atualizar o registro!'
      )
    }
  }

  async buscar(pParams: QueryTipoStatusDTO): Promise<TipoStatusModel[]> {
    try {
      const registros = await this.respository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new TipoStatusInternalServicException(
        error,
        'Erro ao buscar os usuários!'
      )
    }
  }

  async excluir(pId: string): Promise<TipoStatusModel> {
    try {
      const registro = await this.respository.excluir(pId)

      if (!registro) {
        throw new TipoStatusNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new TipoStatusInternalServicException(
        error,
        'Erro ao excluir o registro!'
      )
    }
  }
}
