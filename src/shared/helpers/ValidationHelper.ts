import { ValidationError } from '@/shared/errors/AppErrors';

export class ValidationHelper {
  static isEmptyOrWhitespace(value: string): boolean {
    return !value || value.trim().length === 0;
  }

  static validateRequiredString(value: string, fieldName: string): void {
    if (this.isEmptyOrWhitespace(value)) {
      throw new ValidationError(`${fieldName} is required and cannot be empty`);
    }
  }
}
