// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import DificuldadeAtividadeModel from '../../../domain/dificuldade-atividade/DificuldadeAtividadeModel'
import DificuldadeAtividadeRepository from '../../../domain/dificuldade-atividade/DificuldadeAtividadeRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import DificuldadeAtividadeEntity from '../../../infrastructure/postgres/entities/DificuldadeAtividadeEntity'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class DificuldadeAtividadePostgresRepository
  implements DificuldadeAtividadeRepository
{
  private readonly logger: Logger
  private readonly atividadeRepository: Repository<DificuldadeAtividadeEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.atividadeRepository = postgresConfig
      .getDataSource()
      .getRepository(DificuldadeAtividadeEntity)
  }
  excluir(pId: string): Promise<DificuldadeAtividadeModel | null> {
    throw new Error('Method not implemented.')
  }
  atualizar(
    pId: string,
    pRegistro: DificuldadeAtividadeModel
  ): Promise<DificuldadeAtividadeModel | null> {
    throw new Error('Method not implemented.')
  }
  buscar(
    pParams: Partial<DificuldadeAtividadeModel>
  ): Promise<DificuldadeAtividadeModel[]> {
    throw new Error('Method not implemented.')
  }

  async incluir(
    pRegistro: DificuldadeAtividadeModel
  ): Promise<DificuldadeAtividadeModel> {
    try {
      const registro = await this.atividadeRepository.save(pRegistro)
      return new DificuldadeAtividadeModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
