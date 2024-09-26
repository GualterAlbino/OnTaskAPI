import UsuarioModel from './UsuarioModel'
import BaseRepository from '../base/BaseRepository'

export default interface UsuarioRepository extends BaseRepository {
  excluir(pId: string): Promise<UsuarioModel | null>
  incluir(pRegistro: UsuarioModel): Promise<UsuarioModel>
  buscar(pParams: Partial<UsuarioModel>): Promise<UsuarioModel[]>
  atualizar(pId: string, pRegistro: UsuarioModel): Promise<UsuarioModel | null>
}
