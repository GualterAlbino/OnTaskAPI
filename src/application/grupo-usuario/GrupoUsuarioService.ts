//Domain
import GrupoUsuarioModel from '../../domain/grupo-usuario/GrupoUsuarioModel'
import GrupoUsuarioRepository from '../../domain/grupo-usuario/GrupoUsuarioRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import QueryGrupoUsuarioDTO from './dto/QueryGrupoUsuarioDTO'
import CriarGrupoUsuarioDTO from './dto/CriarGrupoUsuarioDTO'
import AtualizarGrupoUsuarioDTO from './dto/AtualizarGrupoUsuarioDTO'

import {
  GrupoUsuarioInternalServicException,
  GrupoUsuarioNotFoundException
} from './exceptions/GrupoUsuarioExceptions'

export default class GrupoUsuarioService {
  private readonly grupoUsuarioRepository: GrupoUsuarioRepository
  private readonly logger = new Logger(this.constructor.name)

  constructor(pGrupoUsuarioRepository: GrupoUsuarioRepository) {
    this.grupoUsuarioRepository = pGrupoUsuarioRepository
  }

  async incluir(pRegistro: CriarGrupoUsuarioDTO): Promise<GrupoUsuarioModel> {
    try {
      const registro = await this.grupoUsuarioRepository.incluir(
        pRegistro.toDomain()
      )

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new GrupoUsuarioInternalServicException(
        error,
        'Erro ao incluir registro!'
      )
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarGrupoUsuarioDTO
  ): Promise<GrupoUsuarioModel> {
    try {
      const updatedRegistro = await this.grupoUsuarioRepository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new GrupoUsuarioNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new GrupoUsuarioInternalServicException(
        error,
        'Erro ao atualizar o registro!'
      )
    }
  }

  async buscar(pParams: QueryGrupoUsuarioDTO): Promise<GrupoUsuarioModel[]> {
    try {
      const registros = await this.grupoUsuarioRepository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new GrupoUsuarioInternalServicException(
        error,
        'Erro ao buscar os registros!'
      )
    }
  }

  async excluir(pId: string): Promise<GrupoUsuarioModel[]> {
    try {
      let registros = await this.grupoUsuarioRepository.buscar()

      if (!registros || registros.length === 0) {
        throw new GrupoUsuarioNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      const retorno = await this.grupoUsuarioRepository.excluir(pId)

      if (!retorno) {
        throw new GrupoUsuarioNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      return retorno
    } catch (error) {
      this.logger.error(error)
      throw new GrupoUsuarioInternalServicException(
        error,
        'Erro ao excluir o registro!'
      )
    }
  }
}
