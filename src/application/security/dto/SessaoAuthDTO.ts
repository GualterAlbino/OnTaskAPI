import BaseDTO from '../../base/BaseDTO'

export default class SessaoAuthDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string = ''

  @BaseDTO.Optional
  imagem?: string = ''

  @BaseDTO.Required
  role: string = ''

  @BaseDTO.Required
  email: string = ''

  @BaseDTO.Required
  grupos: string[] = []

  constructor(pObjeto: Partial<SessaoAuthDTO>) {
    super(pObjeto)

    if (pObjeto) {
      this.role = pObjeto.role || this.role
      this.nome = pObjeto.nome || this.nome
      this.email = pObjeto.email || this.email
      this.imagem = pObjeto.imagem || this.imagem
      this.grupos = pObjeto.grupos || this.grupos
    }

    BaseDTO.validate(this)
  }
}
