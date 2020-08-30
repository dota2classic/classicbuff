import { ApiResponse } from "apisauce";

export default function<T>(origReq: (...args: any[]) => Promise<ApiResponse<T>>): (...args: any[]) => Promise<T> {
  return (...args: any[]) => origReq(...args).then(it => it.data as T);
}

export function smartify<T, Z>(p: Promise<Z>, con: new (t: Z) => T): Promise<T> {
  return p.then(f => new con(f));
}
