import ProjetoModel from './ProjetoModel'
import BaseRepository from '../base/BaseRepository'

export default interface ProjetoRepository extends BaseRepository {
  excluir(pId: string): Promise<ProjetoModel | null>
  incluir(pRegistro: ProjetoModel): Promise<ProjetoModel>
  buscar(pParams: Partial<ProjetoModel>): Promise<ProjetoModel[]>
  atualizar(pId: string, pRegistro: ProjetoModel): Promise<ProjetoModel | null>
}
