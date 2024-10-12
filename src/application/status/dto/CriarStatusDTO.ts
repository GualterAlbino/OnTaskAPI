import BaseDTO from '../../base/BaseDTO'
import StatusModel from '../../../domain/status/StatusModel'

export default class CriarStatusDTO extends BaseDTO {
  @BaseDTO.Required
  tipoStatusId: string

  @BaseDTO.Required
  grupoId: string

  @BaseDTO.Required
  status: string

  @BaseDTO.Required
  descricao: string

  constructor(pObjeto: StatusModel, pValidarCadastro: boolean = true) {
    super(pObjeto)

    this.status = pObjeto.status
    this.descricao = pObjeto.descricao
    this.tipoStatusId = pObjeto.tipoStatusId
    this.grupoId = pObjeto.grupoId

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new StatusModel(
      {
        status: this.status,
        grupoId: this.grupoId,
        descricao: this.descricao,
        tipoStatusId: this.tipoStatusId
      },
      true
    ).toObject()
  }
}
