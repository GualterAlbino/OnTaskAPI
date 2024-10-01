import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TStatusModel = TBaseModel & {
  status: string
  grupoId: string
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
  tipoStatusId: string = ''

  @BaseModel.Required
  grupoId: string = ''

  constructor(pObjeto: Partial<StatusModel>, pValidarCadastro: boolean = true) {
    super(pObjeto, pValidarCadastro)

    this.status = pObjeto.status || this.status
    this.grupoId = pObjeto.grupoId || this.grupoId
    this.descricao = pObjeto.descricao || this.descricao
    this.tipoStatusId = pObjeto.tipoStatusId || this.tipoStatusId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
