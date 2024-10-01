// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import GrupoUsuarioModel from '../../../domain/grupo-usuario/GrupoUsuarioModel'
import GrupoUsuarioRepository from '../../../domain/grupo-usuario/GrupoUsuarioRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import GrupoUsuarioEntity from '../../../infrastructure/postgres/entities/GrupoUsuarioEntity'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'
import { console } from 'inspector'

export default class GrupoUsuarioPostgresRepository
  implements GrupoUsuarioRepository
{
  private readonly logger: Logger
  private readonly repository: Repository<GrupoUsuarioEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig
      .getDataSource()
      .getRepository(GrupoUsuarioEntity)
  }

  // Método para buscar
  async buscar(
    pParams: Partial<GrupoUsuarioModel>
  ): Promise<GrupoUsuarioModel[]> {
    try {
      const query = queryBuilderPostgres<GrupoUsuarioModel>(pParams)

      console.log(query)

      const registros = await this.repository.find()
      return registros.map((registro) => new GrupoUsuarioModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: GrupoUsuarioModel): Promise<GrupoUsuarioModel> {
    try {
      const registro = await this.repository.save(pRegistro)
      return new GrupoUsuarioModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<GrupoUsuarioModel | null> {
    try {
      validarUUID<GrupoUsuarioModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new GrupoUsuarioModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: GrupoUsuarioModel
  ): Promise<GrupoUsuarioModel | null> {
    try {
      validarUUID<GrupoUsuarioModel>(pId, 'id')

      // Verifica se o registro existe
      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      // Atualiza o registro
      const registro = pRegistro

      const { raw, affected } = await this.repository.update(pId, {
        grupoId: registro.grupoId,
        usuarioId: registro.usuarioId
      })

      if (affected === 0) {
        return null
      }

      return new GrupoUsuarioModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
