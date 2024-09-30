import BaseRepository from '../base/BaseRepository'
import ParticipanteProjetoModel from './ParticipanteProjetoModel'

export default interface ParticipanteProjetoRepository extends BaseRepository {
  excluir(pId: string): Promise<ParticipanteProjetoModel | null>
  incluir(
    pRegistro: ParticipanteProjetoModel
  ): Promise<ParticipanteProjetoModel>
  buscar(
    pParams: Partial<ParticipanteProjetoModel>
  ): Promise<ParticipanteProjetoModel[]>
  atualizar(
    pId: string,
    pRegistro: ParticipanteProjetoModel
  ): Promise<ParticipanteProjetoModel | null>
}
