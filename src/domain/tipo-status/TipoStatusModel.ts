import BaseModel from '../base/BaseModel'
import TBaseModel from '../base/BaseTipoModel'

export type TTipoStatusModel = TBaseModel & {
  tipo: string
  descricao: string
}

export default class TipoStatusModel
  extends BaseModel<TipoStatusModel>
  implements TTipoStatusModel
{
  @BaseModel.Required
  descricao: string = ''

  @BaseModel.Required
  private _tipo: string = ''

  public static readonly ETipoAtividade = {
    ATIVIDADE: 'ATIVIDADE',
    PROJETO: 'PROJETO',
    USUARIO: 'USUARIO'
  } as const

  constructor(
    pObjeto: Partial<TipoStatusModel>,
    pValidarCadastro: boolean = true
  ) {
    super(pObjeto, pValidarCadastro)

    this.tipo = pObjeto.tipo || this.tipo
    this.descricao = pObjeto.descricao || this.descricao

    if (pValidarCadastro) {
      BaseModel.validate(this)
    }
  }

  //-------
  // Tipo de Status
  //-------

  get tipo() {
    return this._tipo
  }

  set tipo(pValor: string) {
    if (!pValor || pValor.trim() === '') {
      throw `O tipo de atividade não pode ser vazio! As atividades válidas são: ${Object.keys(TipoStatusModel.ETipoAtividade).join(', ')}`
    }

    if (!(pValor.toUpperCase() in TipoStatusModel.ETipoAtividade)) {
      throw `O tipo de atividade:[${pValor}] não é permitida! As atividades válidas são: ${Object.keys(TipoStatusModel.ETipoAtividade).join(', ')}`
    }

    this._tipo = pValor.toUpperCase()
  }
}
