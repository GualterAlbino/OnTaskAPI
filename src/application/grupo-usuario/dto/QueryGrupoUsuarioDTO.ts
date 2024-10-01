import BaseDTO from '../../base/BaseDTO'
import GrupoUsuarioModel from '../../../domain/grupo-usuario/GrupoUsuarioModel'

export default class QueryGrupoUsuarioDTO extends BaseDTO {
  @BaseDTO.Optional
  grupoId: string | undefined

  @BaseDTO.Optional
  usuarioId: string | undefined

  constructor(pObjeto: Partial<GrupoUsuarioModel>) {
    super(pObjeto)

    this.grupoId = pObjeto.grupoId
    this.usuarioId = pObjeto.usuarioId
  }
}
