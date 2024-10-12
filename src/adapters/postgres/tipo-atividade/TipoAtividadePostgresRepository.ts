// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import TipoAtividadeModel from '../../../domain/tipo-atividade/TipoAtividadeModel'
import TipoAtividadeRepository from '../../../domain/tipo-atividade/TipoAtividadeRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import TipoAtividadeEntity from '../../../infrastructure/postgres/entities/TipoAtividadeEntity'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class TipoAtividadePostgresRepository
  implements TipoAtividadeRepository
{
  private readonly logger: Logger
  private readonly repository: Repository<TipoAtividadeEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig
      .getDataSource()
      .getRepository(TipoAtividadeEntity)
  }

  // Método para buscar usuários
  async buscar(
    pParams: Partial<TipoAtividadeModel>
  ): Promise<TipoAtividadeModel[]> {
    try {
      const query = queryBuilderPostgres<TipoAtividadeModel>(pParams)

      const registros = await this.repository.find({ where: query })

      return registros.map((registro) => new TipoAtividadeModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: TipoAtividadeModel): Promise<TipoAtividadeModel> {
    try {
      const registro = await this.repository.save(pRegistro)
      return new TipoAtividadeModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<TipoAtividadeModel | null> {
    try {
      validarUUID<TipoAtividadeModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new TipoAtividadeModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: TipoAtividadeModel
  ): Promise<TipoAtividadeModel | null> {
    try {
      validarUUID<TipoAtividadeModel>(pId, 'id')

      // Verifica se o registro existe
      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.repository.update(pId, {
        nome: registro.nome,
        descricao: registro.descricao
      })

      if (affected === 0) {
        return null
      }

      return new TipoAtividadeModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
