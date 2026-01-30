/**
 * Applies options to a builder instance by calling corresponding methods
 * @param builder - The builder instance
 * @param options - Options object with keys matching builder methods
 */
export function applyOptions<BuilderType>(
  builder: BuilderType,
  options?: Record<string, unknown>,
): void {
  if (!options) return;

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined) return;

    const method = builder[key as keyof BuilderType];

    if (typeof method === 'function') {
      (method as (arg: unknown) => BuilderType).call(builder, value);
    }
  });
}
