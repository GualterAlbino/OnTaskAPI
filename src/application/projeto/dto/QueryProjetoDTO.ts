import BaseDTO from '../../base/BaseDTO'
import ProjetoModel from '../../../domain/projeto/ProjetoModel'

export default class QueryProjetoDTO extends BaseDTO {
  @BaseDTO.Required
  statusId: string | undefined

  @BaseDTO.Required
  usuarioResponsavelId: string | undefined

  @BaseDTO.Required
  grupoId: string | undefined

  @BaseDTO.Required
  nome: string | undefined

  @BaseDTO.Required
  descricao: string | undefined

  @BaseDTO.Required
  inicio: Date | undefined

  @BaseDTO.Required
  termino: Date | undefined

  @BaseDTO.Required
  logo: string | undefined

  @BaseDTO.Optional
  previsaoInicio: Date | undefined

  @BaseDTO.Optional
  previsaoTermino: Date | undefined

  constructor(pObjeto: Partial<ProjetoModel>) {
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
  }
}
