import AtividadeModel from './AtividadeModel'
import BaseRepository from '../base/BaseRepository'

export default interface AtividadeRepository extends BaseRepository {
  excluir(pId: string): Promise<AtividadeModel | null>
  incluir(pRegistro: AtividadeModel): Promise<AtividadeModel>
  buscar(pParams: Partial<AtividadeModel>): Promise<AtividadeModel[]>
  atualizar(
    pId: string,
    pRegistro: AtividadeModel
  ): Promise<AtividadeModel | null>
}
