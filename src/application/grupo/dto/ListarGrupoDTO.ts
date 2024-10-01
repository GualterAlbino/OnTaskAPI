import BaseDTO from '../../base/BaseDTO'
import GrupoModel from '../../../domain/grupo/GrupoModel'

export default class ListarGrupoDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  descricao: string

  @BaseDTO.Required
  usuarioResponsavelId: string

  constructor(pObjeto: GrupoModel, pValidarCadastro: boolean = true) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.usuarioResponsavelId = pObjeto.usuarioResponsavelId

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new GrupoModel(
      {
        nome: this.nome,
        descricao: this.descricao,
        usuarioResponsavelId: this.usuarioResponsavelId
      },
      true
    ).toObject()
  }
}
