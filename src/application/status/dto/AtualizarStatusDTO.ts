import BaseDTO from '../../base/BaseDTO'
import StatusModel from '../../../domain/status/StatusModel'

export default class AtualizarStatusDTO extends BaseDTO {
  @BaseDTO.Optional
  tipoStatusId: string

  @BaseDTO.Optional
  status: string

  @BaseDTO.Optional
  descricao: string

  constructor(pObjeto: StatusModel, pValidarCadastro: boolean = false) {
    super(pObjeto)

    this.status = pObjeto.status
    this.descricao = pObjeto.descricao
    this.tipoStatusId = pObjeto.tipoStatusId

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new StatusModel(
      {
        status: this.status,
        descricao: this.descricao,
        tipoStatusId: this.tipoStatusId
      },
      true
    ).toObject()
  }
}
