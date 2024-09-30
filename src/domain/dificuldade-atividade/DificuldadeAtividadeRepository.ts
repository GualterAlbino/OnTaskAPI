import BaseRepository from '../base/BaseRepository'
import DificuldadeAtividadeModel from './DificuldadeAtividadeModel'

export default interface DificuldadeAtividadeRepository extends BaseRepository {
  excluir(pId: string): Promise<DificuldadeAtividadeModel | null>
  incluir(
    pRegistro: DificuldadeAtividadeModel
  ): Promise<DificuldadeAtividadeModel>
  buscar(
    pParams: Partial<DificuldadeAtividadeModel>
  ): Promise<DificuldadeAtividadeModel[]>
  atualizar(
    pId: string,
    pRegistro: DificuldadeAtividadeModel
  ): Promise<DificuldadeAtividadeModel | null>
}
