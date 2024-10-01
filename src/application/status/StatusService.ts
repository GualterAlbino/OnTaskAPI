//Domain
import StatusModel from '../../domain/status/StatusModel'
import StatusRepository from '../../domain/status/StatusRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import TipoStatusService from '../tipo-status/TipoStatusService'
import QueryStatusDTO from './dto/QueryStatusDTO'
import CriarStatusDTO from './dto/CriarStatusDTO'
import AtualizarStatusDTO from './dto/AtualizarStatusDTO'
import QueryTipoStatusDTO from '../tipo-status/dto/QueryTipoStatusDTO'

import {
  StatusNotFoundException,
  StatusForbiddenException,
  StatusUnauthorizedException,
  StatusInternalServicException
} from './exceptions/StatusExceptions'
import { TipoStatusNotFoundException } from '../tipo-status/exceptions/TipoStatusExceptions'

export default class StatusService {
  private readonly repository: StatusRepository
  private readonly tipoStatusService: TipoStatusService
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    pStatusRepository: StatusRepository,
    pTipoStatusService: TipoStatusService
  ) {
    this.repository = pStatusRepository
    this.tipoStatusService = pTipoStatusService
  }

  async incluir(pRegistro: CriarStatusDTO): Promise<StatusModel> {
    try {
      // Verifica se o tipo de status existe
      const tipoStatus = await this.tipoStatusService.buscar(
        new QueryTipoStatusDTO({ id: pRegistro.tipoStatusId })
      )

      if (!tipoStatus) {
        throw new TipoStatusNotFoundException(
          '',
          'Tipo de status não encontrado!'
        )
      }

      const registro = await this.repository.incluir(pRegistro.toDomain())

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new StatusInternalServicException(error, 'Erro ao incluir status!')
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarStatusDTO
  ): Promise<StatusModel> {
    try {
      const updatedRegistro = await this.repository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new StatusNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new StatusInternalServicException(
        error,
        'Erro ao atualizar o registro!'
      )
    }
  }

  async buscar(pParams: QueryStatusDTO): Promise<StatusModel[]> {
    try {
      const registros = await this.repository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new StatusInternalServicException(
        error,
        'Erro ao buscar os usuários!'
      )
    }
  }

  async excluir(pId: string): Promise<StatusModel> {
    try {
      const registro = await this.repository.excluir(pId)

      if (!registro) {
        throw new StatusNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new StatusInternalServicException(
        error,
        'Erro ao excluir o registro!'
      )
    }
  }
}
