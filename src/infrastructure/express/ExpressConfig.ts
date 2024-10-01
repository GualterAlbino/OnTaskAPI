// Bibliotecas
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Shared
import Logger from '../../shared/utils/Logger'

// Middlewares
import errorHandler from './middleware/ErrorHandler'

// Routes
import AuthRoutes from './routes/AuthRoutes'
import StatusRoutes from './routes/StatusRoutes'
import UsuarioRoutes from './routes/UsuarioRoutes'
import TipoStatusRoutes from './routes/TipoStatusRoutes'
import GrupoRoutes from './routes/GrupoRoutes'

export default class ExpressConfig {
  private readonly porta: number
  private readonly logger: Logger
  public readonly app: express.Application

  constructor() {
    this.app = express()
    this.logger = new Logger(this.constructor.name)
    this.porta = Number(process.env.EXPRESS_PORT) || 3005
  }

  async start(): Promise<void> {
    try {
      this.logger.info('Iniciando configuração do Express...')

      this.config()
      this.routes()
      this.middlewares()

      // ...

      this.app.listen(this.porta, () => {})

      this.logger.info(`Aplicação em execução na porta: ${this.porta}!`)
    } catch (error) {
      this.logger.info(`[CONEXÃO COM O BANCO] : ERRO => ${error}`)
      throw error // Lança o erro para interromper a inicialização do servidor
    }
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())

    // ...
  }

  private routes(): void {
    const basePath = '/v1'

    this.app.use(`${basePath}/auth`, AuthRoutes)
    this.app.use(`${basePath}/grupo`, GrupoRoutes)
    this.app.use(`${basePath}/status`, StatusRoutes)
    this.app.use(`${basePath}/usuario`, UsuarioRoutes)
    this.app.use(`${basePath}/tipoStatus`, TipoStatusRoutes)
    // ...

    this.app.get('/', (req, res) => {
      res.send('API em execução')
    })
  }

  private middlewares(): void {
    this.app.use(errorHandler)
  }
}
