import BaseDTO from '../../base/BaseDTO'
import TipoAtividadeModel from '../../../domain/tipo-atividade/TipoAtividadeModel'

export default class CriarTipoAtividadeDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  grupoId: string

  @BaseDTO.Required
  descricao: string

  constructor(pObjeto: TipoAtividadeModel, pValidarCadastro: boolean = true) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.grupoId = pObjeto.grupoId
    this.descricao = pObjeto.descricao

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new TipoAtividadeModel(
      {
        nome: this.nome,
        grupoId: this.grupoId,
        descricao: this.descricao
      },
      true
    ).toObject()
  }
}
