import BaseDTO from '../../base/BaseDTO'

export default class SessaoAuthDTO extends BaseDTO {
  @BaseDTO.Required
  role: string = ''

  @BaseDTO.Required
  email: string = ''

  constructor(pObjeto: Partial<SessaoAuthDTO>) {
    super(pObjeto)

    if (pObjeto) {
      this.role = pObjeto.role || this.role
      this.email = pObjeto.email || this.email
    }

    BaseDTO.validate(this)
  }
}
