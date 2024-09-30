import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type THistoricoAtividadeModel = TBaseModel & {
  inicio: Date
  termino: Date
  atividadeId: string
}

export default class HistoricoAtividadeModel
  extends BaseModel<HistoricoAtividadeModel>
  implements THistoricoAtividadeModel
{
  @BaseModel.Required
  inicio: Date = new Date()

  @BaseModel.Required
  termino: Date = new Date()

  @BaseModel.Required
  atividadeId: string = ''

  constructor(
    pObjeto: Partial<HistoricoAtividadeModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.inicio = pObjeto.inicio || this.inicio
    this.termino = pObjeto.termino || this.termino
    this.atividadeId = pObjeto.atividadeId || this.atividadeId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
