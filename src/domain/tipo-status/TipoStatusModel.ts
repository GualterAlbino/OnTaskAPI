import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TTipoStatusModel = TBaseModel & {
  tipo: string
  descricao: string
}

export default class TipoStatusModel
  extends BaseModel<TipoStatusModel>
  implements TTipoStatusModel
{
  @BaseModel.Required
  tipo: string = ''

  @BaseModel.Required
  descricao: string = ''

  constructor(
    pObjeto: Partial<TipoStatusModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.tipo = pObjeto.tipo || this.tipo
    this.descricao = pObjeto.descricao || this.descricao

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
