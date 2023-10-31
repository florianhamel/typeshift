export function isDefined(elem: any): boolean {
  return (elem !== undefined);
}

export function isUndefined(elem: any): boolean {
  return (elem === undefined);
}

export function nonNull(elem: any): boolean {
  return (elem !== null);
}

export function isNull(elem: any): boolean {
  return (elem === null);
}

export function isEmpty(str: string): boolean {
  return (str === '');
}
