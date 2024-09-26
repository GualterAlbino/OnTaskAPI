// Blibliotecas
import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Version
import { version } from '../../../package.json'

// Logger
import Logger from '../../shared/utils/Logger'

export default class SwaggerConfig {
  private readonly logger: Logger
  private readonly versaoApp: string
  private readonly endpointDoc: string
  private readonly app: express.Application
  private readonly options: swaggerJsdoc.Options

  constructor(app: express.Application) {
    this.app = app
    this.versaoApp = version
    this.endpointDoc = '/doc'
    this.logger = new Logger(this.constructor.name)
    this.options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'OnTask API',
          version: this.versaoApp,
          description: 'Documentação da API'
        },
        servers: [
          {
            url: `http://localhost:3005` // URL do servidor
          }
        ]
      },
      apis: ['./src/infrastructure/express/routes/*.ts'] // Caminho para os arquivos de rotas
    }
  }

  async start(): Promise<void> {
    try {
      this.logger.info('Iniciando configurações do Swagger...')
      const swaggerSpec = swaggerJsdoc(this.options)
      this.app.use(
        this.endpointDoc,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
      )

      this.logger.info('Swagger configurado com sucesso!')
    } catch (error) {
      this.logger.error(`[SWAGGER] : ERRO => ${error}`)
    }
  }
}

//Exemplo
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
