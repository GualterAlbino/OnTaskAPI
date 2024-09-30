import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TParticipanteProjetoModel = TBaseModel & {
  usuarioId: string
  projetoId: string
}

export default class ParticipanteProjetoModel
  extends BaseModel<ParticipanteProjetoModel>
  implements TParticipanteProjetoModel
{
  @BaseModel.Required
  usuarioId: string = ''

  @BaseModel.Required
  projetoId: string = ''

  constructor(
    pObjeto: Partial<ParticipanteProjetoModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.usuarioId = pObjeto.usuarioId || this.usuarioId
    this.projetoId = pObjeto.projetoId || this.projetoId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
