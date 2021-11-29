
// deno-lint-ignore no-explicit-any
function applyOperatorOnFilter(filter: any, key: string, operator: string, value: any) {
  switch (operator) {
    case '=':
      filter[key] = value;
      break;
    case '!=':
      filter[key] = { $ne: value };
      break;
    case '<':
      filter[key] = { $lt: value };
      break;
    case '<=':
      filter[key] = { $lte: value };
      break;
    case '>':
      filter[key] = { $gt: value };
      break;
    case '>=':
      filter[key] = { $gte: value };
      break;
    case '~=':
      filter[key] = { $regex: new RegExp(value, 'i') };
      break;
    case '==':
      filter[key] = { $eq: value }
      break;
    default: throw new Error(`filter invalid operator '${operator}'`);
  }
}

export function makeFiltersFromQuery(query: string) {
  if (!query) return {};

  // deno-lint-ignore no-explicit-any
  const result: any = {};
  const filtersParts = query.split(',');
  let oredQueries = false;

  for (const part of filtersParts) {

    // deno-lint-ignore no-explicit-any
    let [key, operator, value]: any = part.split(':');

    if (key === 'Xor' && operator === '=' && value === 'Xtrue') {
      oredQueries = true;
      continue;
    }

    if (key === undefined) throw new Error(`filter invalid key '${key}'`);
    if (operator === undefined) throw new Error(`filter invalid operator '${operator}'`);
    if (value === undefined) throw new Error(`filter invalid value '${value}'`);

    if (value === 'Xtrue') value = true;
    if (value === 'Xfalse') value = false;
    if (value === 'Xnull') value = null;

    applyOperatorOnFilter(result, key, operator, value);

  }

  if (oredQueries) {
    return {
      $or: Object.entries(result).map(entry =>
        ({ [entry[0]]: entry[1] })
      )
    }
  }

  return result;

}
