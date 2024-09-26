import { Request, Response, NextFunction } from 'express';
import {
  BaseError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
  ExternalServiceError,
  InternalServiceError,
  ValidationDomainError,
  ForbiddenError,
} from '../../../domain/base/BaseError';

export default function errorHandler(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let mensagem = 'Erro interno inesperado no servidor.';

  if (err instanceof ValidationDomainError) {
    statusCode = 400;
  } else if (err instanceof UnauthorizedError) {
    statusCode = 401;
  } else if (err instanceof ForbiddenError) {
    statusCode = 403;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
  } else if (err instanceof DatabaseError) {
    statusCode = 500;
  } else if (err instanceof InternalServiceError) {
    statusCode = 502;
  } else if (err instanceof ExternalServiceError) {
    statusCode = 502;
  }

  mensagem = err.mensagem;

  if (err instanceof BaseError) {
    res.status(statusCode).json(err);
  } else {
    res
      .status(statusCode)
      .json({ tipo: 'Indefinido', mensagem: mensagem, erro: err });
  }
}