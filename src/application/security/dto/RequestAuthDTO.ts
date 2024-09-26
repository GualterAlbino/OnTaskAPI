import BaseDTO from '../../base/BaseDTO'

export default class RequestAuthDTO extends BaseDTO {
  @BaseDTO.Required
  email: string

  @BaseDTO.Required
  senha: string

  constructor(pEmail: string, pSenha: string) {
    super()
    this.email = pEmail
    this.senha = pSenha

    BaseDTO.validate(this)
  }
}
