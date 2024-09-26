//Externos
import bcrypt from 'bcryptjs'

export default class BCryptEncoderPassword {
  static async criptografarSenha(pSenha: string): Promise<string> {
    try {
      return await bcrypt.hash(pSenha, 10)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async descriptografarSenha(
    pSenha: string,
    pSenhaCriptografada: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(pSenhaCriptografada, pSenha)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
