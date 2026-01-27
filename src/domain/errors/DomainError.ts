export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class ScreenValidationError extends ValidationError {
  constructor(field: string, message: string) {
    super(`Screen validation error - ${field}: ${message}`);
  }
}

export class NotFoundError extends DomainError {
  constructor(
    public readonly entity: string,
    public readonly id: string,
  ) {
    super(`${entity} with id '${id}' not found`);
  }
}

export class ConflictError extends DomainError {
  constructor(
    public readonly entity: string,
    public readonly field: string,
    public readonly value: string,
  ) {
    super(`${entity} with ${field} '${value}' already exists`);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized access') {
    super(message);
  }
}

export class ForbiddenError extends DomainError {
  constructor(message: string = 'Forbidden access') {
    super(message);
  }
}
