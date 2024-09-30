import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TProjetoModel = TBaseModel & {
  nome: string
  logo: string
  inicio: Date
  termino: Date
  statusId: string
  descricao: string
  previsaoInicio: Date
  previsaoTermino: Date
  usuarioResponsavelId: string
}

export default class ProjetoModel
  extends BaseModel<ProjetoModel>
  implements TProjetoModel
{
  @BaseModel.Required
  nome: string = ''

  @BaseModel.Required
  logo: string = ''

  @BaseModel.Required
  inicio: Date = new Date()

  @BaseModel.Required
  termino: Date = new Date()

  @BaseModel.Required
  statusId: string = ''

  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Required
  previsaoInicio: Date = new Date()

  @BaseModel.Required
  previsaoTermino: Date = new Date()

  @BaseModel.Required
  usuarioResponsavelId: string = ''

  constructor(
    pObjeto: Partial<ProjetoModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.nome = pObjeto.nome || this.nome
    this.logo = pObjeto.logo || this.logo
    this.inicio = pObjeto.inicio || this.inicio
    this.termino = pObjeto.termino || this.termino
    this.statusId = pObjeto.statusId || this.statusId
    this.descricao = pObjeto.descricao || this.descricao
    this.previsaoInicio = pObjeto.previsaoInicio || this.previsaoInicio
    this.previsaoTermino = pObjeto.previsaoTermino || this.previsaoTermino
    this.usuarioResponsavelId =
      pObjeto.usuarioResponsavelId || this.usuarioResponsavelId

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }
}
