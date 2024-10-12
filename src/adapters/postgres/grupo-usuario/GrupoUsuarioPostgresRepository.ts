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

  async buscar(
    pParams: Partial<GrupoUsuarioModel>
  ): Promise<GrupoUsuarioModel[]> {
    try {
      const query = queryBuilderPostgres<GrupoUsuarioModel>(pParams)

      // Buscando diretamente com o where, sem fazer a busca duas vezes
      const registros = await this.repository.find({ where: query })

      if (registros.length === 0) {
        return []
      }

      // Mapeando os resultados para o modelo correto
      return registros.map((registro) => new GrupoUsuarioModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: GrupoUsuarioModel): Promise<GrupoUsuarioModel> {
    try {
      validarUUID<GrupoUsuarioModel>(pRegistro.usuarioId, 'usuarioId')

      validarUUID<GrupoUsuarioModel>(pRegistro.grupoId, 'grupoId')

      const registro = await this.repository.save(pRegistro)

      return new GrupoUsuarioModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<GrupoUsuarioModel[] | null> {
    try {
      validarUUID<GrupoUsuarioModel>(pId, 'id')

      const registros = await this.buscar({ grupoId: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      for (const registro of registros) {
        const { raw, affected } = await this.repository.delete(registro.id)

        if (affected === 0) {
          return null
        }
      }

      return registros.map((registro) => new GrupoUsuarioModel(registro))
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
