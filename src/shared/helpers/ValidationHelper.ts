export class ValidationHelper {
  private static readonly UUID_V4_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  static isValidUUID(id: string): boolean {
    return this.UUID_V4_REGEX.test(id);
  }

  static isEmptyOrWhitespace(value: string): boolean {
    return !value || value.trim().length === 0;
  }

  static validateRequiredString(value: string, fieldName: string): void {
    if (this.isEmptyOrWhitespace(value)) {
      throw new Error(`${fieldName} is required and cannot be empty`);
    }
  }

  static validateUUID(id: string, fieldName: string = 'ID'): void {
    this.validateRequiredString(id, fieldName);

    if (!this.isValidUUID(id)) {
      throw new Error(`Invalid ${fieldName} format. Expected UUID v4`);
    }
  }
}
