import BaseDTO from '../../base/BaseDTO'
import TipoStatusModel from '../../../domain/tipo-status/TipoStatusModel'

export default class ListarTipoStatusDTO extends BaseDTO {
  @BaseDTO.Required
  tipo: string

  @BaseDTO.Required
  descricao: string

  constructor(pObjeto: TipoStatusModel, pValidarCadastro: boolean = true) {
    super(pObjeto)

    this.tipo = pObjeto.tipo
    this.descricao = pObjeto.descricao

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new TipoStatusModel(
      {
        id: this.id,
        tipo: this.tipo,
        descricao: this.descricao,
        criadoEm: this.criadoEm,
        alteradoEm: this.alteradoEm
      },
      false
    )
  }
}
