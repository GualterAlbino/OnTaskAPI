import { ValidationDomainError } from './BaseError'

export default abstract class BaseModel<T> {
  private _id!: string
  public criadoEm: Date = new Date()
  public alteradoEm: Date = new Date()
  public validarCadastro: boolean = true

  constructor(pObjeto: any, pValidarCadastro?: boolean) {
    if (pObjeto) {
      this.id = pObjeto.id || pObjeto._id || this.id
      this.criadoEm = pObjeto.criadoEm || this.criadoEm
      this.alteradoEm = pObjeto.alteradoEm || this.alteradoEm
    }

    this.validarCadastro = pValidarCadastro || this.validarCadastro
  }

  get id(): string {
    return this._id
  }

  set id(pId: string) {
    this._id = pId
  }

  get(pProperty: string): any {
    return (this as any)[pProperty]
  }

  set(pProperty: string, pValue: any): void {
    this.setProperty(pProperty, pValue)
  }

  private setProperty(pProperty: string, pValue: any): void {
    if (!this.validarCadastro) {
      ;(this as any)[pProperty] = pValue
    } else {
      this.validarCadastro = true
      ;(this as any)[pProperty] = pValue
      this.validarCadastro = false
    }
  }

  /**
   * Converte a instância do modelo em um objeto.
   * @returns Um objeto que representa a instância do modelo.
   */
  toObject(): T {
    const obj = {} as T

    // Itera sobre as propriedades da instância
    for (const key of Object.keys(this)) {
      const value = (this as any)[key]

      // Exclui propriedades que começam com "_" (se necessário)
      if (!key.startsWith('_')) {
        ;(obj as any)[key] = value
      } else {
        // Remove o "_" inicial e adiciona ao objeto final
        ;(obj as any)[key.substring(1)] = value
      }
    }

    return obj
  }

  /**
   * Decorador para marcar uma propriedade como obrigatória.
   *
   * @param target - O objeto alvo do decorador.
   * @param propertyKey - O nome da propriedade.
   */
  static Required(target: any, propertyKey: string): void {
    if (!target) {
      return
    }

    // Inicializa a lista de campos obrigatórios se ainda não existir
    if (!target.constructor.requiredFields) {
      target.constructor.requiredFields = []
    }

    // Adiciona o nome da propriedade à lista de campos obrigatórios
    target.constructor.requiredFields.push(propertyKey)
  }

  static Optional(target: any, propertyKey: string): void {
    // Inicializa a lista de campos opcionais se ainda não existir
    if (!target.constructor.optionalFields) {
      target.constructor.optionalFields = []
    }

    // Adiciona o nome da propriedade à lista de campos opcionais
    target.constructor.optionalFields.push(propertyKey)
  }

  /**
   * Valida se todos os campos obrigatórios estão presentes e não vazios.
   *
   * @param obj - A instância a ser validada.
   * @throws {ValidationError} - Se algum campo obrigatório estiver vazio.
   */
  static validate(obj: any): void {
    // Obtém os campos obrigatórios da instância
    const requiredFields = obj.constructor.requiredFields || []

    // Filtra os campos obrigatórios que estão vazios
    const missingFields = requiredFields.filter((field: string) => !obj[field])

    // Se houver campos obrigatórios faltando, lança uma exceção de validação
    if (missingFields.length > 0) {
      // Apenas por uma questão de estética, removo o "_" dos campos
      const fieldsTratados = missingFields.map((field: string) => {
        return field.replace('_', '')
      })

      throw new ValidationDomainError(
        obj.constructor.name,
        '',
        `Os seguintes campos são obrigatórios e estão vazios: ${fieldsTratados.join(', ')}`
      )
    }
  }
}
