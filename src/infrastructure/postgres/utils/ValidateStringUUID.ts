import { validate as isUUID } from 'uuid'

export function validarUUID<T>(pUUID: string, pCampo: keyof T): boolean {
  try {
    if (!pUUID || pUUID.trim() === '') {
      throw `O valor ${pCampo ? `do campo ${String(pCampo)}` : 'do UUID'} não pode ser vazio!`
    }

    if (!isUUID(pUUID)) {
      throw `O valor ${pCampo ? `do campo ${String(pCampo)}` : ''} não é um UUID válido!`
    }

    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
