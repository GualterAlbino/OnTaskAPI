import BaseDTO from '../../base/BaseDTO'
import StatusModel from '../../../domain/status/StatusModel'

export default class QueryStatusDTO extends BaseDTO {
  @BaseDTO.Optional
  usuarioId: string | undefined

  @BaseDTO.Optional
  tipoStatusId: string | undefined

  @BaseDTO.Optional
  status: string | undefined

  @BaseDTO.Optional
  descricao: string | undefined

  constructor(pObjeto: Partial<StatusModel>) {
    super(pObjeto)

    this.status = pObjeto.status
    this.descricao = pObjeto.descricao
    this.tipoStatusId = pObjeto.tipoStatusId

    BaseDTO.validate(this)
  }
}
