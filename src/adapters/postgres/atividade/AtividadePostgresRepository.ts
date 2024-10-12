// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import AtividadeModel from '../../../domain/atividade/AtividadeModel'
import AtividadeRepository from '../../../domain/atividade/AtividadeRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import AtividadeEntity from '../../../infrastructure/postgres/entities/AtividadeEntity'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class AtividadePostgresRepository
  implements AtividadeRepository
{
  private readonly logger: Logger
  private readonly atividadeRepository: Repository<AtividadeEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.atividadeRepository = postgresConfig
      .getDataSource()
      .getRepository(AtividadeEntity)
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<AtividadeModel>): Promise<AtividadeModel[]> {
    try {
      const query = queryBuilderPostgres<AtividadeModel>(pParams)

      const usuarios = await this.atividadeRepository.find({ where: query })

      return usuarios.map((usuario) => new AtividadeModel(usuario))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: AtividadeModel): Promise<AtividadeModel> {
    try {
      validarUUID<AtividadeModel>(pRegistro.usuarioId, 'usuarioId')
      validarUUID<AtividadeModel>(pRegistro.projetoId, 'projetoId')
      validarUUID<AtividadeModel>(pRegistro.statusId, 'statusId')
      validarUUID<AtividadeModel>(pRegistro.tipoAtividadeId, 'tipoAtividadeId')
      validarUUID<AtividadeModel>(
        pRegistro.dificuldadeAtividadeId,
        'dificuldadeAtividadeId'
      )

      const registro = await this.atividadeRepository.save(pRegistro)
      return new AtividadeModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<AtividadeModel | null> {
    try {
      validarUUID<AtividadeModel>(pId, 'id')

      const usuarios = await this.atividadeRepository.findBy({ id: pId })
      if (!usuarios || usuarios.length === 0) {
        return null
      }

      const { raw, affected } = await this.atividadeRepository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new AtividadeModel(usuarios[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: AtividadeModel
  ): Promise<AtividadeModel | null> {
    try {
      validarUUID<AtividadeModel>(pRegistro.usuarioId, 'usuarioId')
      validarUUID<AtividadeModel>(pRegistro.projetoId, 'projetoId')
      validarUUID<AtividadeModel>(pRegistro.statusId, 'statusId')
      validarUUID<AtividadeModel>(pRegistro.tipoAtividadeId, 'tipoAtividadeId')
      validarUUID<AtividadeModel>(
        pRegistro.dificuldadeAtividadeId,
        'dificuldadeAtividadeId'
      )

      const registros = await this.atividadeRepository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.atividadeRepository.update(pId, {
        nome: registro.nome,
        inicio: registro.inicio,
        termino: registro.termino,
        statusId: registro.statusId,
        usuarioId: registro.usuarioId,
        projetoId: registro.projetoId,
        descricao: registro.descricao,
        emExecucao: registro.emExecucao,
        previsaoInicio: registro.previsaoInicio,
        previsaoTermino: registro.previsaoTermino,
        tipoAtividadeId: registro.tipoAtividadeId,
        tempoEstimadoMinutos: registro.tempoEstimadoMinutos,
        dificuldadeAtividadeId: registro.dificuldadeAtividadeId
      })

      if (affected === 0) {
        return null
      }

      return new AtividadeModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
