// Bibliotecas
import { Repository } from 'typeorm'

// Domain
import UsuarioModel from '../../../domain/usuario/UsuarioModel'
import UsuarioRepository from '../../../domain/usuario/UsuarioRepository'

// Shared
import Logger from '../../../shared/utils/Logger'

// Infra
import PostgresConfig from '../../../infrastructure/postgres/PostgresConfig'
import UsuarioEntity from '../../../infrastructure/postgres/entities/UsuarioEntity'
import { validarUUID } from '../../../infrastructure/postgres/utils/ValidateStringUUID'
import { queryBuilderPostgres } from '../../../infrastructure/postgres/utils/QueryBuilderPostgres'

export default class UsuarioPostgresRepository implements UsuarioRepository {
  private readonly logger: Logger
  private readonly usuarioRepository: Repository<UsuarioEntity>

  constructor() {
    this.logger = new Logger(this.constructor.name)

    // Usando a instância Singleton de PostgresConfig
    const postgresConfig = PostgresConfig.getInstance()
    this.usuarioRepository = postgresConfig
      .getDataSource()
      .getRepository(UsuarioEntity)
  }

  // Método para buscar usuários
  async buscar(pParams: Partial<UsuarioModel>): Promise<UsuarioModel[]> {
    try {
      const query = queryBuilderPostgres<UsuarioModel>(pParams)

      const usuarios = await this.usuarioRepository.find({ where: query })

      return usuarios.map((usuario) => new UsuarioModel(usuario))
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async incluir(pRegistro: UsuarioModel): Promise<UsuarioModel> {
    try {
      const usuario = await this.usuarioRepository.save(pRegistro)
      return new UsuarioModel(usuario)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async excluir(pId: string): Promise<UsuarioModel | null> {
    try {
      validarUUID<UsuarioModel>(pId, 'id')

      const usuarios = await this.usuarioRepository.findBy({ id: pId })
      if (!usuarios || usuarios.length === 0) {
        return null
      }

      const { raw, affected } = await this.usuarioRepository.delete(pId)

      if (affected === 0) {
        return null
      }

      return new UsuarioModel(usuarios[0])
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async atualizar(
    pId: string,
    pRegistro: UsuarioModel
  ): Promise<UsuarioModel | null> {
    try {
      validarUUID<UsuarioModel>(pId, 'id')

      // Verifica se o usuário existe
      const usuarios = await this.usuarioRepository.findBy({ id: pId })
      if (!usuarios || usuarios.length === 0) {
        return null
      }

      // Atualiza o usuário
      const registro = pRegistro.toObject()

      const { raw, affected } = await this.usuarioRepository.update(pId, {
        role: registro.role,
        nome: registro.nome,
        email: registro.email,
        senha: registro.senha
      })

      if (affected === 0) {
        return null
      }

      return new UsuarioModel(registro)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
