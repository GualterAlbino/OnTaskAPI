import BaseDTO from '../../base/BaseDTO'
import AtividadeModel from '../../../domain/atividade/AtividadeModel'

export default class QueryAtividadeDTO extends BaseDTO {
  @BaseDTO.Optional
  usuarioId: string | undefined

  @BaseDTO.Optional
  projetoId: string | undefined

  @BaseDTO.Optional
  statusId: string | undefined

  @BaseDTO.Optional
  tipoAtividadeId: string | undefined

  @BaseDTO.Optional
  dificuldadeAtividadeId: string | undefined

  @BaseDTO.Optional
  nome: string | undefined

  @BaseDTO.Optional
  descricao: string | undefined

  @BaseDTO.Optional
  previsaoInicio: Date | undefined

  @BaseDTO.Optional
  previsaoTermino: Date | undefined

  @BaseDTO.Optional
  inicio: Date | undefined

  @BaseDTO.Optional
  termino: Date | undefined

  @BaseDTO.Optional
  tempoEstimadoMinutos: number | undefined

  @BaseDTO.Optional
  emExecucao: boolean | undefined

  constructor(pObjeto: AtividadeModel, pValidarCadastro: boolean = false) {
    super(pObjeto)

    this.usuarioId = pObjeto.usuarioId
    this.projetoId = pObjeto.projetoId
    this.statusId = pObjeto.statusId
    this.tipoAtividadeId = pObjeto.tipoAtividadeId
    this.dificuldadeAtividadeId = pObjeto.dificuldadeAtividadeId
    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.previsaoInicio = pObjeto.previsaoInicio
    this.previsaoTermino = pObjeto.previsaoTermino
    this.inicio = pObjeto.inicio
    this.termino = pObjeto.termino
    this.tempoEstimadoMinutos = pObjeto.tempoEstimadoMinutos
    this.emExecucao = pObjeto.emExecucao

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new AtividadeModel(
      {
        usuarioId: this.usuarioId,
        projetoId: this.projetoId,
        statusId: this.statusId,
        tipoAtividadeId: this.tipoAtividadeId,
        dificuldadeAtividadeId: this.dificuldadeAtividadeId,
        nome: this.nome,
        descricao: this.descricao,
        previsaoInicio: this.previsaoInicio,
        previsaoTermino: this.previsaoTermino,
        inicio: this.inicio,
        termino: this.termino,
        tempoEstimadoMinutos: this.tempoEstimadoMinutos,
        emExecucao: this.emExecucao
      },
      true
    ).toObject()
  }
}
