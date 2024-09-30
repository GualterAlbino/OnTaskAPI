import BaseRepository from '../base/BaseRepository'
import PermissaoUsuarioProjetoModel from './PermissaoUsuarioProjetoModel'

export default interface PermissaoUsuarioProjetoRepository
  extends BaseRepository {
  excluir(pId: string): Promise<PermissaoUsuarioProjetoModel | null>
  incluir(
    pRegistro: PermissaoUsuarioProjetoModel
  ): Promise<PermissaoUsuarioProjetoModel>
  buscar(
    pParams: Partial<PermissaoUsuarioProjetoModel>
  ): Promise<PermissaoUsuarioProjetoModel[]>
  atualizar(
    pId: string,
    pRegistro: PermissaoUsuarioProjetoModel
  ): Promise<PermissaoUsuarioProjetoModel | null>
}
