import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TTipoAtividadeModel = TBaseModel & {
  nome: string
  descricao: string
  grupoId: string
}

export default class TipoAtividadeModel
  extends BaseModel<TipoAtividadeModel>
  implements TTipoAtividadeModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  grupoId: string = ''

  @BaseModel.Required
  descricao: string = ''

  constructor(
    pObjeto: Partial<TipoAtividadeModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.grupoId = pObjeto.grupoId || this.grupoId
    this.descricao = pObjeto.descricao || this.descricao

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
