export function requireResult<TValue>(value: TValue | undefined): TValue {
  if (value === undefined) throw new Error('Empty result');
  return value;
}
