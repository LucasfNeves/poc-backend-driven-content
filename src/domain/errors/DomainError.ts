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
