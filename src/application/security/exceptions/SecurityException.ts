import {
  ForbiddenError,
  UnauthorizedError
} from '../../../domain/base/BaseError'

const ORIGEM_EXCEPTION = 'Security'

export class SecurityUnauthorizedException extends UnauthorizedError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}

export class SecurityForbiddenException extends ForbiddenError {
  constructor(pError: Error | any, pMensagem: string) {
    super(ORIGEM_EXCEPTION, pError, pMensagem)
  }
}
