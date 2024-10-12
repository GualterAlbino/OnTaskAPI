//Domain
import GrupoModel from '../../domain/grupo/GrupoModel'
import GrupoRepository from '../../domain/grupo/GrupoRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import QueryGrupoDTO from './dto/QueryGrupoDTO'
import CriarGrupoDTO from './dto/CriarGrupoDTO'
import UsuarioService from '../usuario/UsuarioService'
import AtualizarGrupoDTO from './dto/AtualizarGrupoDTO'
import SessaoAuthDTO from '../security/dto/SessaoAuthDTO'
import CriarGrupoUsuarioDTO from '../grupo-usuario/dto/CriarGrupoUsuarioDTO'
import GrupoUsuarioService from '../grupo-usuario/GrupoUsuarioService'

import {
  GrupoNotFoundException,
  GrupoInternalServicException,
  GrupoForbiddenException
} from './exceptions/GrupoExceptions'
import QueryUsuarioDTO from '../usuario/dto/QueryUsuarioDTO'

export default class GrupoService {
  private readonly grupoRepository: GrupoRepository
  private readonly grupoUsuarioService: GrupoUsuarioService
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    pGrupoRepository: GrupoRepository,
    pGrupoUsuarioService: GrupoUsuarioService
  ) {
    this.grupoRepository = pGrupoRepository
    this.grupoUsuarioService = pGrupoUsuarioService
  }

  async incluir(
    pRegistro: CriarGrupoDTO,
    pSessao: SessaoAuthDTO
  ): Promise<GrupoModel> {
    try {
      // Inclui o grupo
      const registro = pRegistro.toDomain()
      registro.usuarioResponsavelId = pSessao.id
      const grupo = await this.grupoRepository.incluir(registro)

      // Inclui o usuário no grupo
      await this.grupoUsuarioService.incluir(
        new CriarGrupoUsuarioDTO({ grupoId: grupo.id, usuarioId: pSessao.id })
      )

      // Retorna o grupo
      return grupo
    } catch (error) {
      this.logger.error(error)
      throw new GrupoInternalServicException(error, 'Erro ao incluir grupo!')
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarGrupoDTO,
    pSessao: SessaoAuthDTO
  ): Promise<GrupoModel> {
    try {
      const grupos = await this.grupoRepository.buscar({ id: pId })
      if (!grupos || grupos.length === 0) {
        throw new GrupoNotFoundException(
          '',
          'Grupo não encontrado para atualização!'
        )
      }

      const grupo = grupos[0]
      if (grupo.usuarioResponsavelId !== pSessao.id) {
        throw new GrupoForbiddenException(
          '',
          'Usuário não é responsável pelo grupo!'
        )
      }

      const updatedRegistro = await this.grupoRepository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new GrupoNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new GrupoInternalServicException(
        error,
        'Erro ao atualizar o grupo!'
      )
    }
  }

  async buscar(pParams: QueryGrupoDTO): Promise<GrupoModel[]> {
    try {
      const registros = await this.grupoRepository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new GrupoInternalServicException(error, 'Erro ao buscar os grupos!')
    }
  }

  async excluir(pId: string): Promise<GrupoModel> {
    try {
      this.grupoUsuarioService.excluir(pId)

      const registro = await this.grupoRepository.excluir(pId)

      if (!registro) {
        throw new GrupoNotFoundException(
          '',
          'Grupo não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new GrupoInternalServicException(error, 'Erro ao excluir o grupo!')
    }
  }
}
