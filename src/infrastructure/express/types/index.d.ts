import { JwtPayload } from 'jsonwebtoken'
import { SessaoAuthDTO } from '../../../application/security/dto/SessaoAuthDTO'

/**
 * Sobrescreve a interface Request do Express para adicionar a sessão do usuário
 * @param sessao - Sessão do usuário
 * @param JwtPayload - Payload do token JWT
 *
 * Dessa forma, é possível acessar a sessão do usuário em qualquer rota e extrair
 * as informações desejadas.
 */
declare global {
  namespace Express {
    interface Request {
      sessao?: SessaoAuthDTO //string | JwtPayload |
    }
  }
}
