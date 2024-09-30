import BaseDTO from '../../base/BaseDTO'
import TipoStatusModel from '../../../domain/tipo-status/TipoStatusModel'

export default class AtualizarTipoStatusDTO extends BaseDTO {
  @BaseDTO.Optional
  tipo: string

  @BaseDTO.Optional
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
        tipo: this.tipo,
        descricao: this.descricao
      },
      true
    ).toObject()
  }
}
