import BaseDTO from '../../base/BaseDTO'
import UsuarioModel from '../../../domain/usuario/UsuarioModel'

export default class QueryUsuarioDTO extends BaseDTO {
  @BaseDTO.Optional
  nome: string | undefined

  @BaseDTO.Optional
  role: string | undefined

  @BaseDTO.Optional
  email: string | undefined

  constructor(pTask: Partial<UsuarioModel>) {
    super(pTask)
    this.nome = pTask.nome
    this.role = pTask.role
    this.email = pTask.email

    BaseDTO.validate(this)
  }
}
