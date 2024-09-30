import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TStatusModel = TBaseModel & {
  status: string
  usuarioId: string
  descricao: string
  tipoStatusId: string
}

export default class StatusModel
  extends BaseModel<StatusModel>
  implements TStatusModel
{
  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Required
  status: string = ''

  @BaseModel.Required
  usuarioId: string = ''

  @BaseModel.Required
  tipoStatusId: string = ''

  constructor(pObjeto: Partial<StatusModel>, pValidarCadastro: boolean = true) {
    super(pObjeto, pValidarCadastro)

    this.status = pObjeto.status || this.status
    this.usuarioId = pObjeto.usuarioId || this.usuarioId
    this.descricao = pObjeto.descricao || this.descricao
    this.tipoStatusId = pObjeto.tipoStatusId || this.tipoStatusId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
