import StatusModel from './StatusModel'
import BaseRepository from '../base/BaseRepository'

export default interface StatusRepository extends BaseRepository {
  excluir(pId: string): Promise<StatusModel | null>
  incluir(pRegistro: StatusModel): Promise<StatusModel>
  buscar(pParams: Partial<StatusModel>): Promise<StatusModel[]>
  atualizar(pId: string, pRegistro: StatusModel): Promise<StatusModel | null>
}
