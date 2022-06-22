export function transformObjectToUrlParams(
  paramObject: any
): Record<string, string> {
  return Object.keys(paramObject).reduce(
    (prev: any, curr: string) => ((prev[curr] = `${paramObject[curr]}`), prev),
    {}
  ) as Record<string, string>;
}
