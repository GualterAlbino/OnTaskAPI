import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TGrupoUsuarioModel = TBaseModel & {
  grupoId: string
  usuarioId: string
}

export default class GrupoUsuarioModel
  extends BaseModel<GrupoUsuarioModel>
  implements TGrupoUsuarioModel
{
  @BaseModel.Required
  grupoId: string = ''

  @BaseModel.Required
  usuarioId: string = ''

  constructor(
    pObjeto: Partial<GrupoUsuarioModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.grupoId = pObjeto.grupoId || this.grupoId
    this.usuarioId = pObjeto.usuarioId || this.usuarioId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
