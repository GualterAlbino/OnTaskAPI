import BaseDTO from '../../base/BaseDTO'
import GrupoModel from '../../../domain/grupo/GrupoModel'

export default class AtualizarGrupoDTO extends BaseDTO {
  @BaseDTO.Optional
  nome: string

  @BaseDTO.Optional
  descricao: string

  @BaseDTO.Optional
  usuarioResponsavelId: string

  constructor(pObjeto: GrupoModel, pValidarCadastro: boolean = false) {
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
