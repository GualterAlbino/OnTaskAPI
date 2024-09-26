import { DataSource } from 'typeorm'
import Logger from '../../shared/utils/Logger'
import path from 'path'

type TTiposDeBanco =
  | 'postgres'
  | 'mysql'
  | 'mariadb'
  | 'sqlite'
  | 'oracle'
  | 'mssql'

export default class PostgresConfig {
  private static instance: PostgresConfig // Instância única
  private readonly logger: Logger
  private readonly dataSource: DataSource

  private constructor() {
    // Torna o construtor privado para evitar múltiplas instâncias
    this.logger = new Logger(this.constructor.name)

    const databaseName = process.env.DB_NAME || 'postgres'
    const databaseHost = process.env.DB_HOST || 'localhost'
    const databasePort = Number(process.env.DB_PORT) || 5432
    const databasePassword = process.env.DB_PASSWORD || 'postgres'
    const databaseUsername = process.env.DB_USERNAME || 'postgres'
    const databaseType = (process.env.DB_TYPE as TTiposDeBanco) || 'postgres'

    this.dataSource = new DataSource({
      type: databaseType,
      host: databaseHost,
      port: databasePort,
      database: databaseName,
      username: databaseUsername,
      password: databasePassword,
      synchronize: true, // Cuidado com essa opção em produção
      entities: [path.join(__dirname, './entities/*{.js,.ts}')]
    })
  }

  public static getInstance(): PostgresConfig {
    // Método estático para retornar a instância única
    if (!PostgresConfig.instance) {
      PostgresConfig.instance = new PostgresConfig()
    }
    return PostgresConfig.instance
  }

  getDataSource(): DataSource {
    return this.dataSource
  }

  async start(): Promise<void> {
    try {
      this.logger.info('Iniciando conexão com o banco...')
      await this.dataSource.initialize()
      this.logger.info('Conexão ao banco realizada com sucesso!')
    } catch (error) {
      this.logger.error(`[CONEXÃO COM O BANCO] : ERRO => ${error}`)
      throw error
    }
  }
}
