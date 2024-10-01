import BaseDTO from '../../base/BaseDTO'
import GrupoModel from '../../../domain/grupo/GrupoModel'

export default class QueryGrupoDTO extends BaseDTO {
  @BaseDTO.Optional
  nome: string | undefined

  @BaseDTO.Optional
  descricao: string | undefined

  @BaseDTO.Optional
  usuarioResponsavelId: string | undefined

  constructor(pObjeto: Partial<GrupoModel>) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.usuarioResponsavelId = pObjeto.usuarioResponsavelId
  }
}
