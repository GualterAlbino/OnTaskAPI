import BaseDTO from '../../base/BaseDTO'
import TipoAtividadeModel from '../../../domain/tipo-atividade/TipoAtividadeModel'

export default class QueryTipoAtividadeDTO extends BaseDTO {
  @BaseDTO.Optional
  nome: string | undefined

  @BaseDTO.Optional
  grupoId: string | undefined

  @BaseDTO.Optional
  descricao: string | undefined

  constructor(pObjeto: Partial<TipoAtividadeModel>) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.grupoId = pObjeto.grupoId
    this.descricao = pObjeto.descricao

    BaseDTO.validate(this)
  }
}
