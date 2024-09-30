import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  InternalServiceError
} from '../../../domain/base/BaseError'

const ORIGEM_EXCEPTION = 'TipoStatus'

export class TipoStatusInternalServicException extends InternalServiceError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class TipoStatusUnauthorizedException extends UnauthorizedError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class TipoStatusForbiddenException extends ForbiddenError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class TipoStatusNotFoundException extends NotFoundError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}
