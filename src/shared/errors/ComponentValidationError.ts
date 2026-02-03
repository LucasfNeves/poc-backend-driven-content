export class ComponentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentValidationError';
  }
}
