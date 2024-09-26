// Database
import PostgresConfig from './postgres/PostgresConfig'

// API
import ExpressConfig from './express/ExpressConfig'

// Swagger
import SwaggerConfig from './swagger/SwaggerConfig'

// Logger
import Logger from '../shared/utils/Logger'
const logger = new Logger('Server')

async function IniciarServer() {
  try {
    logger.info('Iniciando o servidor...')

    // Conectando ao PostgreSQL
    const postgres = PostgresConfig.getInstance()
    await postgres.start()

    // Configurando o Express
    const express = new ExpressConfig()
    await express.start()

    // Configurando o Swagger
    const swagger = new SwaggerConfig(express.app)
    await swagger.start()

    logger.info('Servidor iniciado com sucesso!')
  } catch (error) {
    logger.error(`Falha ao iniciar o servidor: ${error}`)
  }
}

IniciarServer()
