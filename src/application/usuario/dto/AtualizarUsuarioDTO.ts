import BaseDTO from '../../base/BaseDTO'
import UsuarioModel from '../../../domain/usuario/UsuarioModel'

export default class AtualizarUsuarioDTO extends BaseDTO {
  @BaseDTO.Optional
  nome: string

  @BaseDTO.Optional
  role: string

  @BaseDTO.Optional
  email: string

  @BaseDTO.Optional
  senha: string

  constructor(pUsuario: UsuarioModel, pValidarCadastro: boolean = false) {
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
      false
    )
  }
}
