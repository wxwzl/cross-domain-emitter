export function isObject<T = any>(obj: unknown): obj is T {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

export function isPrimitive(value: unknown) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean" ||
    typeof value === "function"
  );
}

export function isArray<T = unknown>(obj: unknown): obj is Array<T> {
  return Object.prototype.toString.call(obj) == "[object Array]";
}

export function isString(obj: unknown): obj is string {
  return Object.prototype.toString.call(obj) == "[object String]";
}

export function isBlob(obj: unknown): obj is Blob {
  return Object.prototype.toString.call(obj) == "[object Blob]";
}

export function isNumber(obj: unknown): obj is number {
  return Object.prototype.toString.call(obj) == "[object Number]";
}

export function isFunction(obj: unknown): obj is Function {
  return Object.prototype.toString.call(obj) == "[object Function]";
}

export function walkObj(
  obj: Record<string, any>,
  handler: (value: any, key: string, obj: any) => void | boolean,
  context?: any
): void {
  if (isEmpty(obj)) {
    console.error("遍历的obj对象为空");
    return;
  }
  const keys = Object.keys(obj);
  const len = keys.length;
  let key = "",
    value: unknown = null;
  for (let i = 0; i < len; i++) {
    key = keys[i];
    value = obj[key];
    if (!isEmpty(handler)) {
      const stop = handler.call(context, value, key, obj);
      if (stop) {
        return;
      }
    }
  }
}

/**
 *
 * 判断是否为空
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isEmpty(obj: any): boolean {
  return obj === undefined || obj === null || obj === "";
}

/**
 *
 * 去除字符串前后空格
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function trim(str: string): string {
  if (str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  }
  return str;
}

export function walkArray<T>(
  array: Array<T>,
  handler: (item: T, index: number, data: Array<T>) => void | boolean,
  context?: any
): void {
  if (isEmpty(array)) {
    return;
  }
  const len = array.length;
  let value;
  for (let i = 0; i < len; i++) {
    value = array[i];
    if (!isEmpty(handler)) {
      const stop: boolean | void = handler.call(context, value, i, array);
      if (stop) {
        return;
      }
    }
  }
}

export function getQueryByUrl(url: string) {
  const query: any = {};
  const queryStr = url.split("?")[1];
  if (queryStr) {
    const vars = queryStr.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      query[pair[0]] = pair[1];
    }
  }
  return query;
}
