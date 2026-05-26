export function hasFieldErrors<T extends Record<string, string | undefined>>(
  errors: T,
): boolean {
  return Object.values(errors).some(Boolean)
}
