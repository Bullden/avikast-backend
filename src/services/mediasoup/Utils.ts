export function requireResult<TValue>(value: TValue | undefined): TValue {
  if (value === undefined) throw new Error('Empty result');
  return value;
}

export function getNameAsDate() {
  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}.${month}.${day}-${hour}:${minute}:${second}`;
}
