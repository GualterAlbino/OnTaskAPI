// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import StatusModel from '../../../domain/status/StatusModel'
import StatusRepository from '../../../domain/status/StatusRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import StatusEntity from '../../../infrastructure/postgres/entities/StatusEntity'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class StatusPostgresRepository implements StatusRepository {
  private readonly logger: Logger
  private readonly repository: Repository<StatusEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig.getDataSource().getRepository(StatusEntity)
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<StatusModel>): Promise<StatusModel[]> {
    try {
      const query = queryBuilderPostgres<StatusModel>(pParams)

      const registros = await this.repository.find({ where: query })
      return registros.map((registro) => new StatusModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: StatusModel): Promise<StatusModel> {
    try {
      const registro = await this.repository.save(pRegistro)
      return new StatusModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<StatusModel | null> {
    try {
      validarUUID<StatusModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new StatusModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: StatusModel
  ): Promise<StatusModel | null> {
    try {
      validarUUID<StatusModel>(pId, 'id')

      // Verifica se o registro existe
      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.repository.update(pId, {
        status: registro.status,
        grupoId: registro.grupoId,
        descricao: registro.descricao,
        tipoStatusId: registro.tipoStatusId
      })

      if (affected === 0) {
        return null
      }

      return new StatusModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
