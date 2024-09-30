import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TPermissaoUsuarioProjeto = TBaseModel & {
  usuarioId: string
  projetoId: string
  alterar: boolean
  excluir: boolean
  visualizar: boolean
}

export default class PermissaoUsuarioProjetoModel
  extends BaseModel<PermissaoUsuarioProjetoModel>
  implements TPermissaoUsuarioProjeto
{
  @BaseModel.Required
  alterar: boolean = false

  @BaseModel.Required
  excluir: boolean = false

  @BaseModel.Required
  visualizar: boolean = false

  @BaseModel.Required
  usuarioId: string = ''

  @BaseModel.Required
  projetoId: string = ''

  constructor(
    pObjeto: Partial<PermissaoUsuarioProjetoModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.alterar = pObjeto.alterar || this.alterar
    this.excluir = pObjeto.excluir || this.excluir
    this.usuarioId = pObjeto.usuarioId || this.usuarioId
    this.projetoId = pObjeto.projetoId || this.projetoId
    this.visualizar = pObjeto.visualizar || this.visualizar

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
