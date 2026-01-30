/**
 * Ensures a nested property exists on an object, creating it if necessary
 * @param target - The object to check
 * @param propertyKey - The property key to ensure exists
 * @returns The property value (existing or newly created)
 * @example
 * const component = { type: 'text' };
 * ensureProperty(component, 'style').fontSize = 16;
 * // component.style is now { fontSize: 16 }
 */
export function ensureProperty<TObject extends object, TKey extends keyof TObject>(
  target: TObject,
  propertyKey: TKey,
): NonNullable<TObject[TKey]> {
  if (!target[propertyKey]) {
    target[propertyKey] = {} as TObject[TKey];
  }
  return target[propertyKey] as NonNullable<TObject[TKey]>;
}
