import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TDificuldadeAtividadeModel = TBaseModel & {
  nome: string
  descricao: string
  projetoId: string
  usuarioId: string
  tempoMinutos: number
}

export default class DificuldadeAtividadeModel
  extends BaseModel<DificuldadeAtividadeModel>
  implements TDificuldadeAtividadeModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Required
  projetoId: string = ''

  @BaseModel.Required
  usuarioId: string = ''

  @BaseModel.Required
  tempoMinutos: number = 0

  constructor(
    pObjeto: Partial<DificuldadeAtividadeModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.descricao = pObjeto.descricao || this.descricao
    this.projetoId = pObjeto.projetoId || this.projetoId
    this.usuarioId = pObjeto.usuarioId || this.usuarioId
    this.tempoMinutos = pObjeto.tempoMinutos || this.tempoMinutos

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
