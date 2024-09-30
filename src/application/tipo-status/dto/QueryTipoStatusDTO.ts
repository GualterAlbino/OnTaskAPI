import BaseDTO from '../../base/BaseDTO'
import TipoStatusModel from '../../../domain/tipo-status/TipoStatusModel'

export default class QueryTipoStatusDTO extends BaseDTO {
  @BaseDTO.Optional
  tipo: string | undefined

  @BaseDTO.Optional
  descricao: string | undefined

  constructor(pObjeto: Partial<TipoStatusModel>) {
    super(pObjeto)

    this.tipo = pObjeto.tipo
    this.descricao = pObjeto.descricao

    BaseDTO.validate(this)
  }
}
