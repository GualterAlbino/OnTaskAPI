// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import GrupoModel from '../../../domain/grupo/GrupoModel'
import GrupoRepository from '../../../domain/grupo/GrupoRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import GrupoEntity from '../../../infrastructure/postgres/entities/GrupoEntity'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class GrupoPostgresRepository implements GrupoRepository {
  private readonly logger: Logger
  private readonly repository: Repository<GrupoEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig.getDataSource().getRepository(GrupoEntity)
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<GrupoModel>): Promise<GrupoModel[]> {
    try {
      const query = queryBuilderPostgres<GrupoModel>(pParams)

      const registros = await this.repository.find({ where: query })

      console.log(registros)

      return registros.map((registro) => new GrupoModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: GrupoModel): Promise<GrupoModel> {
    try {
      const registro = await this.repository.save(pRegistro)
      return new GrupoModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<GrupoModel | null> {
    try {
      validarUUID<GrupoModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new GrupoModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: GrupoModel
  ): Promise<GrupoModel | null> {
    try {
      validarUUID<GrupoModel>(pId, 'id')

      // Verifica se o registro existe
      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.repository.update(pId, {
        nome: registro.nome,
        descricao: registro.descricao,
        usuarioResponsavelId: registro.usuarioResponsavelId
      })

      if (affected === 0) {
        return null
      }

      return new GrupoModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
