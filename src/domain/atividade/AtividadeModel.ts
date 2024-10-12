import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TAtividadeModel = TBaseModel & {
  nome: string
  inicio: Date
  termino: Date
  statusId: string
  usuarioId: string
  projetoId: string
  descricao: string
  emExecucao: boolean
  previsaoInicio: Date
  previsaoTermino: Date
  tipoAtividadeId: string
  tempoEstimadoMinutos: number
  dificuldadeAtividadeId: string
}

export default class AtividadeModel
  extends BaseModel<AtividadeModel>
  implements TAtividadeModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  inicio: Date = new Date()

  @BaseModel.Required
  termino: Date = new Date()

  @BaseModel.Required
  statusId: string = ''

  @BaseModel.Required
  usuarioId: string = ''

  @BaseModel.Required
  projetoId: string = ''

  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Optional
  emExecucao: boolean = false

  @BaseModel.Required
  previsaoInicio: Date = new Date()

  @BaseModel.Required
  previsaoTermino: Date = new Date()

  @BaseModel.Required
  tipoAtividadeId: string = ''

  @BaseModel.Required
  tempoEstimadoMinutos: number = 0

  @BaseModel.Required
  dificuldadeAtividadeId: string = ''

  constructor(
    pObjeto: Partial<AtividadeModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.inicio = pObjeto.inicio || this.inicio
    this.termino = pObjeto.termino || this.termino
    this.statusId = pObjeto.statusId || this.statusId
    this.usuarioId = pObjeto.usuarioId || this.usuarioId
    this.projetoId = pObjeto.projetoId || this.projetoId
    this.descricao = pObjeto.descricao || this.descricao
    this.emExecucao = pObjeto.emExecucao || this.emExecucao
    this.previsaoInicio = pObjeto.previsaoInicio || this.previsaoInicio
    this.previsaoTermino = pObjeto.previsaoTermino || this.previsaoTermino
    this.tipoAtividadeId = pObjeto.tipoAtividadeId || this.tipoAtividadeId
    this.tempoEstimadoMinutos =
      pObjeto.tempoEstimadoMinutos || this.tempoEstimadoMinutos
    this.dificuldadeAtividadeId =
      pObjeto.dificuldadeAtividadeId || this.dificuldadeAtividadeId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
