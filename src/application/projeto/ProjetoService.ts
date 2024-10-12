//Domain
import ProjetoModel from '../../domain/projeto/ProjetoModel'
import ProjetoRepository from '../../domain/projeto/ProjetoRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import GrupoService from '../grupo/GrupoService'
import StatusService from '../status/StatusService'
import UsuarioService from '../usuario/UsuarioService'
import QueryProjetoDTO from './dto/QueryProjetoDTO'
import CriarProjetoDTO from './dto/CriarProjetoDTO'
import SessaoAuthDTO from '../security/dto/SessaoAuthDTO'

import {
  ProjetoForbiddenException,
  ProjetoInternalServicException,
  ProjetoNotFoundException
} from './exceptions/ProjetoExceptions'
import AtualizarProjetoDTO from './dto/AtualizarProjetoDTO'
import QueryStatusDTO from '../status/dto/QueryStatusDTO'
import QueryGrupoDTO from '../grupo/dto/QueryGrupoDTO'

export default class ProjetoService {
  private readonly projetoRepository: ProjetoRepository
  private readonly grupoService: GrupoService
  private readonly statusService: StatusService
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    pProjetoRepository: ProjetoRepository,
    pGrupoService: GrupoService,
    pStatusService: StatusService
  ) {
    this.projetoRepository = pProjetoRepository
    this.grupoService = pGrupoService
    this.statusService = pStatusService
  }

  async incluir(
    pRegistro: CriarProjetoDTO,
    pSessao: SessaoAuthDTO
  ): Promise<ProjetoModel> {
    try {
      const registro = pRegistro.toDomain()
      registro.usuarioResponsavelId = pSessao.id

      // Verifica se o status existe
      const status = await this.statusService.buscar(
        new QueryStatusDTO({ id: registro.statusId })
      )
      if (!status || status.length === 0) {
        throw new ProjetoNotFoundException(
          '',
          'Status informado não encontrado!'
        )
      }

      // Verifica se o grupo existe
      const grupo = await this.grupoService.buscar(
        new QueryGrupoDTO({ id: registro.grupoId })
      )
      if (!grupo || grupo.length === 0) {
        throw new ProjetoNotFoundException(
          '',
          'Grupo informado não encontrado!'
        )
      }

      // Inclui o projeto
      const projeto = await this.projetoRepository.incluir(registro)

      // Retorna o grupo
      return projeto
    } catch (error) {
      this.logger.error(error)
      throw new ProjetoInternalServicException(error, 'Erro ao incluir grupo!')
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarProjetoDTO,
    pSessao: SessaoAuthDTO
  ): Promise<ProjetoModel> {
    try {
      const projetos = await this.projetoRepository.buscar({ id: pId })
      if (!projetos || projetos.length === 0) {
        throw new ProjetoNotFoundException(
          '',
          'Projeto não encontrado para atualização!'
        )
      }

      const projeto = projetos[0]
      if (projeto.usuarioResponsavelId !== pSessao.id) {
        throw new ProjetoForbiddenException(
          '',
          'Usuário não é responsável pelo projeto!'
        )
      }

      const updatedRegistro = await this.projetoRepository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new ProjetoNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new ProjetoInternalServicException(
        error,
        'Erro ao atualizar o grupo!'
      )
    }
  }

  async buscar(pParams: QueryProjetoDTO): Promise<ProjetoModel[]> {
    try {
      const registros = await this.projetoRepository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new ProjetoInternalServicException(
        error,
        'Erro ao buscar os projetos!'
      )
    }
  }

  async excluir(pId: string): Promise<ProjetoModel> {
    try {
      const registro = await this.projetoRepository.excluir(pId)

      if (!registro) {
        throw new ProjetoNotFoundException(
          '',
          'Projeto não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new ProjetoInternalServicException(
        error,
        'Erro ao excluir o grupo!'
      )
    }
  }
}
