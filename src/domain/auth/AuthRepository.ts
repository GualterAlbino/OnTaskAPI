import UsuarioModel from '../usuario/UsuarioModel'

export default interface AuthRepository {
  gerarToken(usuario: UsuarioModel): string
  verificarToken(token: string): Promise<UsuarioModel>
}
