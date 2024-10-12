import BaseDTO from '../../base/BaseDTO'
import ProjetoModel from '../../../domain/projeto/ProjetoModel'

export default class AtualizarProjetoDTO extends BaseDTO {
  @BaseDTO.Required
  statusId: string

  @BaseDTO.Required
  usuarioResponsavelId: string

  @BaseDTO.Required
  grupoId: string

  @BaseDTO.Required
  nome: string

  @BaseDTO.Required
  descricao: string

  @BaseDTO.Required
  inicio: Date

  @BaseDTO.Required
  termino: Date

  @BaseDTO.Required
  logo: string

  @BaseDTO.Optional
  previsaoInicio: Date

  @BaseDTO.Optional
  previsaoTermino: Date

  constructor(pObjeto: ProjetoModel, pValidarCadastro: boolean = false) {
    super(pObjeto)

    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.inicio = pObjeto.inicio
    this.termino = pObjeto.termino
    this.statusId = pObjeto.statusId
    this.logo = pObjeto.logo
    this.previsaoInicio = pObjeto.previsaoInicio
    this.previsaoTermino = pObjeto.previsaoTermino
    this.usuarioResponsavelId = pObjeto.usuarioResponsavelId
    this.grupoId = pObjeto.grupoId

    if (pValidarCadastro) {
      BaseDTO.validate(this)
    }
  }

  toDomain() {
    return new ProjetoModel(
      {
        nome: this.nome,
        descricao: this.descricao,
        inicio: this.inicio,
        termino: this.termino,
        statusId: this.statusId,
        logo: this.logo,
        previsaoInicio: this.previsaoInicio,
        previsaoTermino: this.previsaoTermino,
        usuarioResponsavelId: this.usuarioResponsavelId,
        grupoId: this.grupoId
      },
      true
    ).toObject()
  }
}
