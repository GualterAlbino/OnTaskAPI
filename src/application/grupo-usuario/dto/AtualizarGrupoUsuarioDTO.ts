import BaseDTO from '../../base/BaseDTO'
import GrupoUsuarioModel from '../../../domain/grupo-usuario/GrupoUsuarioModel'

export default class AtualizarGrupoUsuarioDTO extends BaseDTO {
  @BaseDTO.Optional
  grupoId: string

  @BaseDTO.Optional
  usuarioId: string

  constructor(pObjeto: GrupoUsuarioModel, pValidarCadastro: boolean = false) {
    super(pObjeto)

    this.grupoId = pObjeto.grupoId
    this.usuarioId = pObjeto.usuarioId

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
