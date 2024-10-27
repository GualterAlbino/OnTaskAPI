import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  InternalServiceError
} from '../../../domain/base/BaseError'

const ORIGEM_EXCEPTION = 'DificuldadeAtividade'

export class DificuldadeAtividadeInternalServicException extends InternalServiceError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class DificuldadeAtividadeUnauthorizedException extends UnauthorizedError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class DificuldadeAtividadeForbiddenException extends ForbiddenError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class DificuldadeAtividadeNotFoundException extends NotFoundError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}
