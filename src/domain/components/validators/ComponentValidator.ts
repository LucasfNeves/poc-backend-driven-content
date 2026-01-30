import { ComponentValidationError } from '../errors/ComponentValidationError';

export class ComponentValidator {
  /**
   * Validates color in Flutter format (0xAARRGGBB)
   * @param color - Color string to validate
   * @throws {ComponentValidationError} If color format is invalid
   * @example
   * validateColor('0xFFFF5722') // Valid
   * validateColor('#FF5722')    // Invalid - throws error
   */
  static validateColor(color: string): void {
    const flutterFormat = /^0x[0-9A-Fa-f]{8}$/;

    if (!flutterFormat.test(color)) {
      throw new ComponentValidationError('Color must be in Flutter format (0xAARRGGBB)');
    }
  }

  /**
   * Validates that a number is not negative
   * @param value - Number to validate
   * @param fieldName - Name of the field for error message
   * @throws {ComponentValidationError} If value is negative
   */
  static validateNonNegative(value: number, fieldName: string): void {
    if (value < 0) {
      throw new ComponentValidationError(`${fieldName} cannot be negative`);
    }
  }

  /**
   * Validates that a number is greater than zero
   * @param value - Number to validate
   * @param fieldName - Name of the field for error message
   * @throws {ComponentValidationError} If value is not positive
   */
  static validatePositive(value: number, fieldName: string): void {
    if (value <= 0) {
      throw new ComponentValidationError(`${fieldName} must be greater than 0`);
    }
  }

  /**
   * Validates that a string is not empty
   * @param value - String to validate
   * @param fieldName - Name of the field for error message
   * @throws {ComponentValidationError} If string is empty or whitespace
   */
  static validateNotEmpty(value: string, fieldName: string): void {
    if (!value || value.trim() === '') {
      throw new ComponentValidationError(`${fieldName} cannot be empty`);
    }
  }

  /**
   * Validates component type matches expected type
   * @param component - Component object with type property
   * @param expectedType - Expected component type
   * @param fieldName - Name of the field for error message
   * @throws {ComponentValidationError} If component type doesn't match
   */
  static validateComponentType(
    component: { type: string },
    expectedType: string,
    fieldName: string,
  ): void {
    if (!component || component.type !== expectedType) {
      throw new ComponentValidationError(`${fieldName} must be a valid ${expectedType} component`);
    }
  }
}
