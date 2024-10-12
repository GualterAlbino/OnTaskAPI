//Domain
import AtividadeModel from '../../domain/atividade/AtividadeModel'
import AtividadeRepository from '../../domain/atividade/AtividadeRepository'

//Shared
import Logger from '../../shared/utils/Logger'

//Application
import CriarAtividadeDTO from './dto/CriarAtividadeDTO'
import AtualizarAtividadeDTO from './dto/AtualizarAtividadeDTO'
import QueryAtividadeDTO from './dto/QueryAtividadeDTO'
import ListarAtividadeDTO from './dto/ListarAtividadeDTO'

import {
  AtividadeInternalServicException,
  AtividadeNotFoundException
} from './exceptions/AtividadeExceptions'
import UsuarioService from '../usuario/UsuarioService'
import ProjetoService from '../projeto/ProjetoService'
import TipoAtividadeService from '../tipo-atividade/TipoAtividadeService'
import QueryUsuarioDTO from '../usuario/dto/QueryUsuarioDTO'
import QueryProjetoDTO from '../projeto/dto/QueryProjetoDTO'
import QueryTipoAtividadeDTO from '../tipo-atividade/dto/QueryTipoAtividadeDTO'

export default class AtividadeService {
  private readonly repository: AtividadeRepository
  private readonly usuarioService: UsuarioService
  private readonly projetoService: ProjetoService
  private readonly tipoAtividadeService: TipoAtividadeService
  //private readonly dificuldadeAtividadeService: DificuldadeAtividadeService
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    pAtividadeRepository: AtividadeRepository,
    pUsuarioService: UsuarioService,
    pProjetoService: ProjetoService,
    pTipoAtividadeService: TipoAtividadeService
    //pDificuldadeAtividadeService: DificuldadeAtividadeService
  ) {
    this.repository = pAtividadeRepository
    this.usuarioService = pUsuarioService
    this.projetoService = pProjetoService
    this.tipoAtividadeService = pTipoAtividadeService
  }

  async incluir(pRegistro: CriarAtividadeDTO): Promise<AtividadeModel> {
    try {
      // Verirfica se o usuário existe
      const usuarios = await this.usuarioService.buscar(
        new QueryUsuarioDTO({ id: pRegistro.usuarioId })
      )
      if (!usuarios || usuarios.length === 0) {
        throw new AtividadeNotFoundException('', 'Usuário não encontrado!')
      }

      // Verifica se o projeto existe
      const projetos = await this.projetoService.buscar(
        new QueryProjetoDTO({ id: pRegistro.projetoId })
      )
      if (!projetos || projetos.length === 0) {
        throw new AtividadeNotFoundException('', 'Projeto não encontrado!')
      }

      // Verifica se o tipo de atividade existe
      const tipoAtividade = await this.tipoAtividadeService.buscar(
        new QueryTipoAtividadeDTO({ id: pRegistro.tipoAtividadeId })
      )
      if (!tipoAtividade) {
        throw new AtividadeNotFoundException(
          '',
          'Tipo de atividade não encontrado!'
        )
      }

      // Verifica se o status existe
      const status = await this.tipoAtividadeService.buscar(
        new QueryTipoAtividadeDTO({ id: pRegistro.statusId })
      )
      if (!status) {
        throw new AtividadeNotFoundException('', 'Registro não encontrado!')
      }

      const registro = await this.repository.incluir(pRegistro.toDomain())

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new AtividadeInternalServicException(
        error,
        'Erro ao incluir Registro!'
      )
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtualizarAtividadeDTO
  ): Promise<AtividadeModel> {
    try {
      const updatedRegistro = await this.repository.atualizar(
        pId,
        pRegistro.toDomain()
      )

      if (!updatedRegistro) {
        throw new AtividadeNotFoundException(
          '',
          'Registro não encontrado para atualização!'
        )
      }

      return updatedRegistro
    } catch (error) {
      this.logger.error(error)
      throw new AtividadeInternalServicException(
        error,
        'Erro ao atualizar o registro!'
      )
    }
  }

  async buscar(pParams: QueryAtividadeDTO): Promise<AtividadeModel[]> {
    try {
      const registros = await this.repository.buscar(pParams)

      return registros
    } catch (error) {
      this.logger.error(error)
      throw new AtividadeInternalServicException(
        error,
        'Erro ao buscar os usuários!'
      )
    }
  }

  async excluir(pId: string): Promise<AtividadeModel> {
    try {
      const registro = await this.repository.excluir(pId)

      if (!registro) {
        throw new AtividadeNotFoundException(
          '',
          'Registro não encontrado para exclusão!'
        )
      }

      return registro
    } catch (error) {
      this.logger.error(error)
      throw new AtividadeInternalServicException(
        error,
        'Erro ao excluir o registro!'
      )
    }
  }
}
