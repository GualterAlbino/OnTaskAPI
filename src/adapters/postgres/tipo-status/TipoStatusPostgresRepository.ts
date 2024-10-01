// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import TipoStatusModel from '../../../domain/tipo-status/TipoStatusModel'
import TipoStatusRepository from '../../../domain/tipo-status/TipoStatusRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import TipoStatusEntity from '../../../infrastructure/postgres/entities/TipoStatusEntity'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class TipoStatusPostgresRepository
  implements TipoStatusRepository
{
  private readonly logger: Logger
  private readonly repository: Repository<TipoStatusEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig
      .getDataSource()
      .getRepository(TipoStatusEntity)
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<TipoStatusModel>): Promise<TipoStatusModel[]> {
    try {
      const query = queryBuilderPostgres<TipoStatusModel>(pParams)

      const registros = await this.repository.find({ where: query })
      return registros.map((registro) => new TipoStatusModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: TipoStatusModel): Promise<TipoStatusModel> {
    try {
      const registro = await this.repository.save(pRegistro)
      return new TipoStatusModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<TipoStatusModel | null> {
    try {
      validarUUID<TipoStatusModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new TipoStatusModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: TipoStatusModel
  ): Promise<TipoStatusModel | null> {
    try {
      validarUUID<TipoStatusModel>(pId, 'id')

      // Verifica se o registro existe
      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.repository.update(pId, {
        tipo: registro.tipo,
        descricao: registro.descricao
      })

      if (affected === 0) {
        return null
      }

      return new TipoStatusModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
