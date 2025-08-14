import { nanoid as id } from "nanoid";
export function nanoid(size = 21): string {
  return id(size);
}
