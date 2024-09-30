import BaseRepository from '../base/BaseRepository'
import TipoAtividadeModel from './TipoAtividadeModel'

export default interface TipoAtividadeRepository extends BaseRepository {
  excluir(pId: string): Promise<TipoAtividadeModel | null>
  incluir(pRegistro: TipoAtividadeModel): Promise<TipoAtividadeModel>
  buscar(pParams: Partial<TipoAtividadeModel>): Promise<TipoAtividadeModel[]>
  atualizar(
    pId: string,
    pRegistro: TipoAtividadeModel
  ): Promise<TipoAtividadeModel | null>
}
