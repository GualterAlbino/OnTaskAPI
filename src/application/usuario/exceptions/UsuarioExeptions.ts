import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  InternalServiceError
} from '../../../domain/base/BaseError'

const ORIGEM_EXCEPTION = 'Usuario'

export class UsuarioInternalServicException extends InternalServiceError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class UsuarioUnauthorizedException extends UnauthorizedError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class UsuarioForbiddenException extends ForbiddenError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class UsuarioNotFoundException extends NotFoundError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}
