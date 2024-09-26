import BaseModel from '../base/BaseModel'

export type TUsuarioModel = {
  id: string
  nome: string
  role: string
  senha: string
  email: string
  criadoEm: Date
  alteradoEm: Date
}

export default class UsuarioModel
  extends BaseModel<UsuarioModel>
  implements TUsuarioModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  senha: string = ''

  @BaseModel.Required
  private _role: string = ''

  @BaseModel.Required
  private _email: string = ''

  public static readonly ERoleUsuario = {
    CLIENTE: 'CLIENTE',
    DESENVOLVEDOR: 'DESENVOLVEDOR',
    SUPER: 'SUPER'
  } as const

  constructor(
    pObjeto: Partial<UsuarioModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.role = pObjeto.role || this._role
    this.senha = pObjeto.senha || this.senha
    this.email = pObjeto.email || this._email

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }

  //-------
  // Role
  //-------

  get role() {
    return this._role
  }

  set role(pRole: string) {
    if (!pRole || pRole.trim() === '') {
      throw `A role do usuário não pode ser vazia! As roles válidas são: ${Object.keys(UsuarioModel.ERoleUsuario).join(', ')}`
    }

    if (!(pRole.toUpperCase() in UsuarioModel.ERoleUsuario)) {
      throw `O status:[${pRole}] não é permitido! Os status válidos são: ${Object.keys(UsuarioModel.ERoleUsuario).join(', ')}`
    }

    this._role = pRole.toUpperCase()
  }

  //-------
  // Email
  //-------

  get email() {
    return this._email
  }

  set email(pEmail: string) {
    if (!pEmail || pEmail.trim() === '') {
      throw 'O e-mail do usuário não pode ser vazio!'
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!regex.test(pEmail)) {
      throw `O e-mail: [${pEmail}] é inválido!`
    }

    this._email = pEmail
  }
}
