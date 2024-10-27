import BaseDTO from '../../base/BaseDTO'
import DificuldadeAtividadeModel from '../../../domain/dificuldade-atividade/DificuldadeAtividadeModel'

export default class AtualizarAtividadeDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string = ''

  @BaseDTO.Required
  descricao: string = ''

  @BaseDTO.Required
  projetoId: string = ''

  @BaseDTO.Required
  usuarioId: string = ''

  @BaseDTO.Required
  tempoMinutos: number = 0

  constructor(
    pObjeto: DificuldadeAtividadeModel,
    pValidarCadastro: boolean = false
  ) {
    super(pObjeto)

    this.usuarioId = pObjeto.usuarioId
    this.projetoId = pObjeto.projetoId

    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.tempoMinutos = pObjeto.tempoMinutos

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new DificuldadeAtividadeModel(
      this,

      false
    ).toObject()
  }
}
