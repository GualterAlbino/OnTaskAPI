import TipoStatusModel from './TipoStatusModel'
import BaseRepository from '../base/BaseRepository'

export default interface TipoStatusRepository extends BaseRepository {
  excluir(pId: string): Promise<TipoStatusModel | null>
  incluir(pRegistro: TipoStatusModel): Promise<TipoStatusModel>
  buscar(pParams: Partial<TipoStatusModel>): Promise<TipoStatusModel[]>
  atualizar(
    pId: string,
    pRegistro: TipoStatusModel
  ): Promise<TipoStatusModel | null>
}
