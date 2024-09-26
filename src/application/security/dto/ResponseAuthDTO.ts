import BaseDTO from '../../base/BaseDTO'

export default class ResponseAuthDTO extends BaseDTO {
  @BaseDTO.Required
  token: string

  @BaseDTO.Required
  dataCriacao: Date

  @BaseDTO.Required
  dataExpiracao: Date

  constructor(pToken: string, pDataCriacao: Date, pDataExpiracao: Date) {
    super()
    this.token = pToken
    this.dataCriacao = pDataCriacao
    this.dataExpiracao = pDataExpiracao

    BaseDTO.validate(this)
  }
}
