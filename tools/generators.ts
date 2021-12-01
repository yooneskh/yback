
export function generateUUID(parts = 3) {
  return (Array(parts).map(() => Math.random())
    .map(it => it.toString(22))
    .map(it => it.slice(2))
    .join('-')
  );
}
