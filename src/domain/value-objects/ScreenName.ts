import { ScreenValidationError } from '@/shared/errors/AppErrors';

export class ScreenName {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 100;
  private static readonly PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  private constructor(private readonly value: string) {}

  static create(name: string): ScreenName {
    if (!name || typeof name !== 'string') {
      throw new ScreenValidationError('name', 'must be a string');
    }

    const trimmed = name.trim().toLowerCase();

    if (trimmed.length < ScreenName.MIN_LENGTH) {
      throw new ScreenValidationError('name', 'cannot be empty');
    }

    if (trimmed.length > ScreenName.MAX_LENGTH) {
      throw new ScreenValidationError('name', `cannot exceed ${ScreenName.MAX_LENGTH} characters`);
    }

    if (!ScreenName.PATTERN.test(trimmed)) {
      throw new ScreenValidationError(
        'name',
        'must be in kebab-case format (e.g., "home-dashboard")',
      );
    }

    return new ScreenName(trimmed);
  }

  static fromPersistence(name: string): ScreenName {
    return new ScreenName(name);
  }

  toString(): string {
    return this.value;
  }

  equals(other: ScreenName): boolean {
    return this.value === other.value;
  }
}
