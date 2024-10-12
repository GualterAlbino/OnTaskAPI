// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import ProjetoModel from '../../../domain/projeto/ProjetoModel'
import ProjetoRepository from '../../../domain/projeto/ProjetoRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import ProjetoEntity from '../../../infrastructure/postgres/entities/ProjetoEntity'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class ProjetoPostgresRepository implements ProjetoRepository {
  private readonly logger: Logger
  private readonly repository: Repository<ProjetoEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.repository = postgresConfig
      .getDataSource()
      .getRepository(ProjetoEntity)
  }

  async incluir(pRegistro: ProjetoModel): Promise<ProjetoModel> {
    try {
      validarUUID<ProjetoModel>(
        pRegistro.usuarioResponsavelId,
        'usuarioResponsavelId'
      )

      const registro = await this.repository.save(pRegistro)
      return new ProjetoModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<ProjetoModel>): Promise<ProjetoModel[]> {
    try {
      const query = queryBuilderPostgres<ProjetoModel>(pParams)

      const registros = await this.repository.find({ where: query })

      return registros.map((registro) => new ProjetoModel(registro))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<ProjetoModel | null> {
    try {
      validarUUID<ProjetoModel>(pId, 'id')

      const registros = await this.repository.findBy({ id: pId })
      if (!registros || registros.length === 0) {
        return null
      }

      const { raw, affected } = await this.repository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new ProjetoModel(registros[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: ProjetoModel
  ): Promise<ProjetoModel | null> {
    try {
      validarUUID<ProjetoModel>(pId, 'id')

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

      return new ProjetoModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
