import BaseDTO from '../../base/BaseDTO'
import AtividadeModel from '../../../domain/atividade/AtividadeModel'

export default class AtualizarAtividadeDTO extends BaseDTO {
  @BaseDTO.Required
  usuarioId: string

  @BaseDTO.Required
  projetoId: string

  @BaseDTO.Required
  statusId: string

  @BaseDTO.Required
  tipoAtividadeId: string

  @BaseDTO.Required
  dificuldadeAtividadeId: string

  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  descricao: string

  @BaseDTO.Required
  previsaoInicio: Date

  @BaseDTO.Required
  previsaoTermino: Date

  @BaseDTO.Required
  inicio: Date

  @BaseDTO.Required
  termino: Date

  @BaseDTO.Required
  tempoEstimadoMinutos: number

  @BaseDTO.Required
  emExecucao: boolean

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
