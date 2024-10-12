import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TGrupoModel = TBaseModel & {
  nome: string
  descricao: string
  usuarioResponsavelId: string
}

export default class GrupoModel
  extends BaseModel<GrupoModel>
  implements TGrupoModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Optional
  usuarioResponsavelId: string = ''

  constructor(pObjeto: Partial<GrupoModel>, pValidarCadastro: boolean = true) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.descricao = pObjeto.descricao || this.descricao
    this.usuarioResponsavelId =
      pObjeto.usuarioResponsavelId || this.usuarioResponsavelId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
