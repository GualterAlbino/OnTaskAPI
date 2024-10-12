import BaseDTO from '../../base/BaseDTO'
import TipoAtividadeModel from '../../../domain/tipo-atividade/TipoAtividadeModel'

export default class AtualizarTipoAtividadeDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string = ''

  @BaseDTO.Required
  descricao: string = ''

  constructor(pObjeto: TipoAtividadeModel, pValidarCadastro: boolean = true) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new TipoAtividadeModel(
      {
        nome: this.nome,
        descricao: this.descricao
      },
      true
    ).toObject()
  }
}
