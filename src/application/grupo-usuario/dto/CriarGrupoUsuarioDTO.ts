import BaseDTO from '../../base/BaseDTO'
import GrupoUsuarioModel from '../../../domain/grupo-usuario/GrupoUsuarioModel'

export default class CriarGrupoUsuarioDTO extends BaseDTO {
  @BaseDTO.Required
  grupoId: string = ''

  @BaseDTO.Required
  usuarioId: string = ''

  constructor(pObjeto: Partial<GrupoUsuarioModel>, pValidarCadastro: boolean = true) {
    super(pObjeto)


    this.grupoId = pObjeto.grupoId || this.grupoId
    this.usuarioId = pObjeto.usuarioId || this.usuarioId

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new GrupoUsuarioModel(
      {
        grupoId: this.grupoId,
        usuarioId: this.usuarioId
      },
      true
    ).toObject()
  }
}
