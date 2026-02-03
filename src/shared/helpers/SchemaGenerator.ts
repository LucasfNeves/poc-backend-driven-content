import { z } from 'zod';

export class SchemaGenerator {
  /**
   * Converte um enum de strings em um schema Zod enum
   * @example
   * enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' }
   * const schema = SchemaGenerator.fromEnum(Status);
   */
  static fromEnum<T extends Record<string, string>>(enumObj: T) {
    const values = Object.values(enumObj);

    if (values.length === 0) {
      throw new Error('Enum deve ter pelo menos um valor');
    }

    return z.enum(values as [string, ...string[]]);
  }
}
