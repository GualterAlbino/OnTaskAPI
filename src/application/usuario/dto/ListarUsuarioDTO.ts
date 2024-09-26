import BaseDTO from '../../base/BaseDTO'
import UsuarioModel from '../../../domain/usuario/UsuarioModel'

export default class ListarUsuarioDTO extends BaseDTO {
  @BaseDTO.Required
  role: string

  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  email: string

  constructor(pUsuario: UsuarioModel) {
    super(pUsuario)

    this.role = pUsuario.role
    this.nome = pUsuario.nome
    this.email = pUsuario.email

    BaseDTO.validate(this)
  }

  toDomain() {
    return new UsuarioModel(
      {
        id: this.id,
        role: this.role,
        nome: this.nome,
        email: this.email
      },
      false
    )
  }
}
