export default class TokenJWTConfig {
  private static _secretJWT: string = 'secret'
  private static _expiracaoToken: string = '1h'

  static get secretJWT() {
    if (process.env.SECRET_JWT) {
      return process.env.SECRET_JWT
    } else {
      return TokenJWTConfig._secretJWT
    }
  }

  static set secretJWT(pValue: string) {
    throw new Error('secretJWT não pode ser alterado')
  }

  static get expiracaoToken() {
    if (process.env.EXPIRACAO_TOKEN) {
      return process.env.EXPIRACAO_TOKEN
    } else {
      return TokenJWTConfig._expiracaoToken
    }
  }

  static set expiracaoToken(pValue: string) {
    throw new Error('expiracaoToken não pode ser alterado')
  }
}
