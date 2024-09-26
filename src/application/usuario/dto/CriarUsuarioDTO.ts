import BaseDTO from '../../base/BaseDTO'
import UsuarioModel from '../../../domain/usuario/UsuarioModel'

export default class CriarUsuarioDTO extends BaseDTO {
  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  role: string

  @BaseDTO.Required
  email: string

  @BaseDTO.Required
  senha: string

  constructor(pUsuario: UsuarioModel, pValidarCadastro: boolean = true) {
    super(pUsuario)
    this.nome = pUsuario.nome
    this.role = pUsuario.role
    this.email = pUsuario.email
    this.senha = pUsuario.senha

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new UsuarioModel(
      {
        nome: this.nome,
        role: this.role,
        email: this.email,
        senha: this.senha
      },
      true
    ).toObject()
  }
}
