import GrupoModel from './GrupoModel'
import BaseRepository from '../base/BaseRepository'

export default interface StatusRepository extends BaseRepository {
  excluir(pId: string): Promise<GrupoModel | null>
  incluir(pRegistro: GrupoModel): Promise<GrupoModel>
  buscar(pParams: Partial<GrupoModel>): Promise<GrupoModel[]>
  atualizar(pId: string, pRegistro: GrupoModel): Promise<GrupoModel | null>
}
