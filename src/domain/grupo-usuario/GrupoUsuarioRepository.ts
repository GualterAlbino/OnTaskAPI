import GrupoUsuarioModel from './GrupoUsuarioModel'
import BaseRepository from '../base/BaseRepository'

export default interface GrupoUsuarioRepository extends BaseRepository {
  excluir(pId: string): Promise<GrupoUsuarioModel | null>
  incluir(pRegistro: GrupoUsuarioModel): Promise<GrupoUsuarioModel>
  buscar(pParams: Partial<GrupoUsuarioModel>): Promise<GrupoUsuarioModel[]>
  atualizar(
    pId: string,
    pRegistro: GrupoUsuarioModel
  ): Promise<GrupoUsuarioModel | null>
}
